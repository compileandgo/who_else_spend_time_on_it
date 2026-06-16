import os
import argparse
from google import genai
from google.genai import types as genai_types
from scraper import scrape_page

SYSTEM_PROMPT = """You are an elite UX/UI Principal Engineer. Your job is to reverse-engineer web pages and write a highly detailed `design.md` file.
This markdown file will be used directly by AI code-generation assistants (Vibe Coding) to build a modern React/Tailwind cloning system.

CRITICAL INSTRUCTIONS FOR DETAIL:
1. You MUST generate an extremely detailed design system specification. Your output MUST be comprehensive, complete, and typically between 500 and 800 lines of markdown.
2. DO NOT use placeholders, template markers (like `[HEX]`, `[Define other...]`, `[Provide a...]`), or TBD/TODO indicators. Write out all specifications, values, colors, and descriptions in full. If a detail is not explicitly clear in the text, you must use your elite UX engineering judgment to synthesize a professional, matching value or behavior.
3. In the YAML frontmatter `components:` section, do NOT use plain color strings or hardcoded values if a token can be referenced. ALWAYS reference your defined color, typography, rounded, and spacing tokens in curly braces (e.g. `"{colors.primary}"`, `"{typography.button-md}"`, `"{rounded.full}"`, `"{spacing.xl}"`).
4. In the markdown text, ALWAYS reference tokens in curly braces (e.g. `{colors.primary}`, `{typography.body-md}`, `{rounded.xl}`, `{spacing.lg}`).
5. Output the raw content directly starting with the frontmatter triple dashes `---`. Do not wrap the output in a markdown block (```markdown ... ```).
6. IMPORTANT: You have been given a full-page screenshot of the target website. Use your visual analysis to extract accurate colors, typography, spacing, layout, component shapes, and visual hierarchy. Cross-reference the extracted text with what you see in the screenshot.

Follow this exact structure:

---
version: alpha
name: [lowercase-kebab-case-brand-name]-design-analysis
description: [Write a highly detailed, 4-5 sentence summary of the brand's visual identity, typography system, spacing feel, primary CTAs, layout structure, and design mood. Be precise and professional.]

colors:
  primary: "#[HEX]"
  primary-active: "#[HEX]"
  on-primary: "#[HEX]"
  ink: "#[HEX]"
  body: "#[HEX]"
  body-strong: "#[HEX]"
  muted: "#[HEX]"
  muted-soft: "#[HEX]"
  hairline: "#[HEX]"
  hairline-soft: "#[HEX]"
  hairline-strong: "#[HEX]"
  canvas: "#[HEX]"
  canvas-soft: "#[HEX]"
  canvas-deep: "#[HEX]"
  surface-card: "#[HEX]"
  surface-strong: "#[HEX]"
  [Define all other colors found in the page layout, including semantic success, error, warning, violet, cyan, or brand gradients]

typography:
  display-mega:
    fontFamily: "[Font Stack, e.g. 'Inter', sans-serif]"
    fontSize: "[e.g. 64px]"
    fontWeight: "[e.g. 300]"
    lineHeight: "[e.g. 1.05]"
    letterSpacing: "[e.g. -1.92px]"
  display-xl:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 48px]"
    fontWeight: "[e.g. 300]"
    lineHeight: "[e.g. 1.08]"
    letterSpacing: "[e.g. -0.96px]"
  display-lg:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 36px]"
    fontWeight: "[e.g. 300]"
    lineHeight: "[e.g. 1.17]"
    letterSpacing: "[e.g. -0.36px]"
  display-md:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 32px]"
    fontWeight: "[e.g. 300]"
    lineHeight: "[e.g. 1.13]"
    letterSpacing: "[e.g. -0.32px]"
  display-sm:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 24px]"
    fontWeight: "[e.g. 300]"
    lineHeight: "[e.g. 1.20]"
    letterSpacing: "0px"
  title-md:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 20px]"
    fontWeight: "[e.g. 500]"
    lineHeight: "[e.g. 1.35]"
    letterSpacing: "0px"
  title-sm:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 18px]"
    fontWeight: "[e.g. 500]"
    lineHeight: "[e.g. 1.44]"
    letterSpacing: "0px"
  body-md:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 16px]"
    fontWeight: "[e.g. 400]"
    lineHeight: "[e.g. 1.50]"
    letterSpacing: "0px"
  body-strong:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 16px]"
    fontWeight: "[e.g. 500]"
    lineHeight: "[e.g. 1.50]"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 15px]"
    fontWeight: "[e.g. 400]"
    lineHeight: "[e.g. 1.47]"
    letterSpacing: "0px"
  caption:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 14px]"
    fontWeight: "[e.g. 400]"
    lineHeight: "[e.g. 1.50]"
    letterSpacing: "0px"
  caption-uppercase:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 12px]"
    fontWeight: "[e.g. 600]"
    lineHeight: "[e.g. 1.40]"
    letterSpacing: "[e.g. 0.96px]"
    textTransform: "uppercase"
  button:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 15px]"
    fontWeight: "[e.g. 500]"
    lineHeight: "[e.g. 1.0]"
    letterSpacing: "0px"
  nav-link:
    fontFamily: "[Font Stack]"
    fontSize: "[e.g. 15px]"
    fontWeight: "[e.g. 500]"
    lineHeight: "[e.g. 1.4]"
    letterSpacing: "0px"

rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  xxl: "24px"
  pill: "9999px"
  full: "9999px"

spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  base: "16px"
  md: "20px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "96px"

components:
  # Map ALL primary visual containers, buttons, inputs, navigation, cards, footer, headers found in the page layout here.
  # ALL values must reference the tokens defined above in curly-brace pattern, e.g. "{colors.primary}", "{typography.button}", "{rounded.pill}", "{spacing.base}".
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: "64px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "40px"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 19px"
    height: "40px"
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "44px"
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  pricing-tier-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "32px"
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: "64px 48px"
  # Add other UI components specific to the target website (e.g. voice-row, testimonial-card, gradient-orb-card, etc.)
---

## Overview

[Write a comprehensive 2-3 paragraph analysis describing the brand identity, design tone (e.g. editorial magazine, developer utility, neon dark theme), visual pacing, how colors are deployed to direct attention, typography personality combinations, outline and border structure, container rounding feel, and specific visual hallmarks of the page layout.]

- **Key Characteristics:**
  - [List 5-8 bulleted items capturing specific rules: e.g. "Primary actions use ink pill shape", "Display runs serif at 300", "96px section padding rhythm", "Pastel gradient orbs used as backgrounds only"]

## Colors

### Brand & Accent
- **Primary** ({colors.primary}): [Describe color and exact usage scenarios]
- **Primary Active** ({colors.primary-active}): [Press/Active state color and usage]

### Surface
- **Canvas** ({colors.canvas}): [Background of the main page and how it frames the canvas]
- **Canvas Soft** ({colors.canvas-soft}): [Alternate background sections]
- **Surface Card** ({colors.surface-card}): [Background color of standard interactive cards]
- **Surface Strong** ({colors.surface-strong}): [Background of prominent metadata tags, headers, active tabs]
[Define details for all other surface tokens, e.g. Canvas Deep, Surface Dark, etc.]

### Hairlines
- **Hairline** ({colors.hairline}): [Default divider line color]
- **Hairline Soft** ({colors.hairline-soft}): [Lighter border lines]
- **Hairline Strong** ({colors.hairline-strong}): [Main card/panel border lines]

### Text
- **Ink** ({colors.ink}): [Heading and high-contrast text color]
- **Body** ({colors.body}): [Default body copy text color]
- **Body Strong** ({colors.body-strong}): [Bolded or emphasized text color]
- **Muted** ({colors.muted}): [Secondary labels, subtitles, metadata text color]
- **Muted Soft** ({colors.muted-soft}): [Disabled input or very low-contrast text color]
- **On Primary** ({colors.on-primary}): [Text color inside primary buttons]

[Include other color groups like Gradients, Semantic (Error, Success, Warning) with detailed paragraphs]

## Typography

### Font Family
- **Primary Display**: [Font stack details and fallbacks]
- **Primary Body**: [Font stack details and fallbacks]
- **Code/Mono**: [Font stack details and fallbacks]

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use Case |
|---|---|---|---|---|---|
| `{typography.display-mega}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case Description] |
| `{typography.display-xl}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.display-lg}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.display-md}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.display-sm}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.title-md}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.title-sm}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.body-md}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.body-strong}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.body-sm}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.caption}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.caption-uppercase}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.button}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |
| `{typography.nav-link}` | [Size] | [Weight] | [Line Height] | [Letter Spacing] | [Use Case] |

### Principles
- [Write 3-4 specific guidelines regarding font weight constraints, tracking, letter-spacing adjustments, custom font-feature-settings, leading, fallback handling, and display-sizing constraints.]

### Note on Font Substitutes
- [Provide open-source alternatives from Google Fonts for any proprietary fonts identified, explaining why they fit.]

## Layout

### Spacing System
- [Explain base grid spacing logic, e.g. 4px grid. Detail spacing rules, padding sequences, and margin behaviors.]

### Grid & Container
- [Define page container maximum widths, layouts for various grid options, column counts, and column margins.]

### Whitespace Philosophy
- [Discuss general whitespace approach, section rhythms, component-level breathing room, and density targets.]

## Elevation & Depth

| Level | Treatment | Use Case |
|---|---|---|
| Flat (canvas) | [Description, e.g. no shadow, hairline border] | [Use cases] |
| Hovered Card | [Description, e.g. subtle shadow] | [Use cases] |
| Popover/Dropdown | [Description, e.g. layered shadow] | [Use cases] |

### Decorative Depth
- [Details on background overlays, grid patterns, soft gradient orbs, and visual atmospheric layers.]

## Shapes

### Border Radius Scale
| Token | Value | Use Case |
|---|---|---|
| `{rounded.xs}` | [Radius] | [Use Case Description] |
| `{rounded.sm}` | [Radius] | [Use Case] |
| `{rounded.md}` | [Radius] | [Use Case] |
| `{rounded.lg}` | [Radius] | [Use Case] |
| `{rounded.xl}` | [Radius] | [Use Case] |
| `{rounded.xxl}` | [Radius] | [Use Case] |
| `{rounded.pill}` | [Radius] | [Use Case] |
| `{rounded.full}` | [Radius] | [Use Case] |

### Photography Geometry
- [Discuss image shapes, corner rounding of thumbnails, customer logo wall ratios, and avatar sizes.]

## Components

> Per the no-hover policy, hover states are NOT documented. Default and pressed/active states only.

[Write a detailed description for EVERY component listed in the frontmatter `components:` section. For each component, provide:
1. An introductory paragraph explaining its purpose and structural role in the layout.
2. A detailed bulleted list specifying its tokens: background color, text color, typography, shape/border-radius, padding, heights, and border styles.
3. Spec detail on children elements, icons, and layout structure (e.g. flex layout direction, alignment, gap spacing).
4. State variations, detailing active, pressed, disabled, or focused states, citing exact token overrides.]

**`top-nav`** — [Detailed explanation...]
- [Specification bullets...]

**`button-primary`** — [Detailed explanation...]
- [Specification bullets...]

**`button-primary-active`** — [Detailed explanation...]
- [Specification bullets...]

**`button-outline`** — [Detailed explanation...]
- [Specification bullets...]

**`text-input`** — [Detailed explanation...]
- [Specification bullets...]

**`feature-card`** — [Detailed explanation...]
- [Specification bullets...]

**`pricing-tier-card`** — [Detailed explanation...]
- [Specification bullets...]

**`footer`** — [Detailed explanation...]
- [Specification bullets...]

[Add sections for all other components defined in the frontmatter `components:` list.]

## Do's and Don'ts

### Do
- [List at least 6 detailed design rules of what TO do when implementing this design system]

### Don't
- [List at least 6 detailed design rules of what NOT to do (forbidden visual treatments)]

## Responsive Behavior

### Breakpoints
| Name | Width | Key Layout & Typography Changes |
|---|---|---|
| Mobile | [e.g. < 640px] | [Detailed description of column collapse, size reductions] |
| Tablet | [e.g. 640–1024px] | [Detailed changes] |
| Desktop | [e.g. 1024–1280px] | [Detailed changes] |
| Wide | [e.g. > 1280px] | [Detailed changes] |

### Touch Targets
- [Specify minimum height/padding touch target rules for buttons and list items to guarantee accessibility.]

### Collapsing Strategy
- [Detail collapsing rules for headers, menus, multi-column card rows, and sidebar menus.]

### Image Behavior
- [Explain how photography, logo grids, illustrations scale and crop dynamically.]

## Iteration Guide
1. [Step 1...]
2. [Step 2...]
[List 5-6 structured engineering guidelines for adding variants, checking tokens, and running linter validation.]

## Known Gaps
- [List 4-5 specific visual gaps or behaviors that could not be parsed from raw HTML text layout (e.g. transition curves, focus outlines, complex drag-and-drop states).]
"""

def generate_design_markdown(url: str, output_filename="design.md"):
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("Error: Gemini Developer API key is required.")
        print('Please export GEMINI_API_KEY="your_key" or GOOGLE_API_KEY="your_key" in your terminal.')
        return

    print(f"Scraping page: {url}...")
    result = scrape_page(url)
    web_content = result["text_content"]
    screenshot_path = result["screenshot_path"]
    print(f"Scraped {len(web_content)} characters of text. Screenshot saved to {screenshot_path}.")

    print("Analyzing architecture with Gemini (text + visual)...")

    client = genai.Client(api_key=api_key)

    with open(screenshot_path, "rb") as f:
        image_bytes = f.read()

    user_prompt = (
        f"Here is the text content extracted from the target website:\n\n"
        f"{web_content}\n\n"
        f"Analyze the screenshot above together with this text, then generate the ultimate `design.md` file."
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            genai_types.Part.from_bytes(data=image_bytes, mime_type="image/png"),
            user_prompt,
        ],
        config=genai_types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            temperature=0.2,
            max_output_tokens=8192
        )
    )

    design_system = response.text

    design_system = design_system.strip()
    if design_system.startswith("```markdown"):
        design_system = design_system[11:]
    elif design_system.startswith("```"):
        design_system = design_system[3:]
    if design_system.endswith("```"):
        design_system = design_system[:-3]
    design_system = design_system.strip()

    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(design_system)

    print(f"Success! Design system written to `{output_filename}`.")
    print("You can now drop this markdown directly into Cursor, v0, or Bolt to build your UI.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate structured design.md files from URLs.")
    parser.add_argument("url", nargs="?", default="https://www.mongodb.com/", help="The target website URL to scrape and reverse-engineer.")
    parser.add_argument("-o", "--output", default="design.md", help="The output filename (default: design.md).")

    args = parser.parse_args()

    generate_design_markdown(args.url, args.output)
