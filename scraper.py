import os
import json
from playwright.sync_api import sync_playwright


def scrape_page(url: str, output_dir: str = "previews") -> dict:
    """Scrape a page using Playwright with full-page screenshot and component data."""
    os.makedirs(output_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path="/usr/bin/chromium",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"],
        )
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(url, wait_until="networkidle", timeout=30000)

        screenshot_path = os.path.join(output_dir, "fullpage.png")
        page.screenshot(path=screenshot_path, full_page=True)

        text_content = page.evaluate("""
        () => {
            const lines = [];
            const tags = ['h1','h2','h3','h4','h5','h6','p','a','button','input','label','li','span','nav','header','footer','section','article'];
            document.querySelectorAll(tags.join(',')).forEach(el => {
                const tag = el.tagName.toLowerCase();
                const text = (el.textContent || '').trim();
                if (!text) return;
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return;

                if (['h1','h2','h3','h4','h5','h6'].includes(tag)) {
                    lines.push(`[${tag.toUpperCase()}] ${text}`);
                } else if (tag === 'a') {
                    const href = el.getAttribute('href') || '';
                    lines.push(`[link: ${href}] ${text}`);
                } else if (tag === 'button') {
                    lines.push(`[button] ${text}`);
                } else if (tag === 'input') {
                    const p = el.getAttribute('placeholder') || '';
                    const v = el.getAttribute('value') || '';
                    lines.push(`[input: placeholder="${p}", value="${v}"]`);
                } else if (tag === 'li') {
                    lines.push(`- ${text}`);
                } else if (['nav','header','footer','section','article'].includes(tag)) {
                    lines.push(`<${tag}> ${text.slice(0, 100)}`);
                } else {
                    lines.push(text);
                }
            });
            return lines.join('\\n');
        }
        """)

        components_json = page.evaluate("""
        () => {
            const els = [];
            const seen = new Set();

            document.querySelectorAll('header, nav, main, section, article, aside, footer, div, button, a, input, select, textarea, h1, h2, h3, h4, h5, h6, p, span, ul, ol, li, img, svg, form, label').forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.width < 10 || r.height < 10) return;

                const s = window.getComputedStyle(el);
                if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return;

                const text = (el.textContent || '').trim().slice(0, 100);
                const key = el.tagName + r.top + r.left + r.width + text.slice(0, 30);
                if (seen.has(key)) return;
                seen.add(key);

                els.push({
                    tag: el.tagName.toLowerCase(),
                    id: el.id,
                    class: (el.className || '').toString().slice(0, 150),
                    role: el.getAttribute('role') || '',
                    text,
                    rect: { t: Math.round(r.top), l: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) },
                    styles: {
                        bg: s.backgroundColor,
                        color: s.color,
                        fontSize: s.fontSize,
                        fontWeight: s.fontWeight,
                        fontFamily: s.fontFamily,
                        borderRadius: s.borderRadius,
                        padding: s.padding,
                        margin: s.margin,
                        border: s.border,
                        boxShadow: s.boxShadow,
                    }
                });
            });
            return JSON.stringify(els);
        }
        """)

        browser.close()

    return {
        "screenshot_path": screenshot_path,
        "text_content": text_content[:30000],
        "components": json.loads(components_json),
    }
