// Lucide Icons initialization
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initApp();
});

// App State
const state = {
    markdown: "",
    parsedTokens: {},
    sections: {},
    backendStatus: {
        has_backend_key: false,
        available_models: []
    },
    history: []
};

// Hardcoded MongoDB preset for instant wow factor
const MONGO_PRESET = `---
version: alpha
name: MongoDB-design-analysis
description: MongoDB carries a strong dual-mode visual identity — dark deep-teal hero bands with bright MongoDB green CTA pills paired with stark white documentation surfaces. The system uses Euclid Circular A as its display face, anchors a 3-tier pricing comparison (Free / Flex / Dedicated), and presents extensive course catalogs in card grids with colored category tags.
colors:
  primary: "#00ed64"
  primary-deep: "#00b545"
  primary-pressed: "#008c34"
  on-primary: "#001e2b"
  brand-green: "#00ed64"
  brand-green-dark: "#00684a"
  brand-green-mid: "#00a35c"
  brand-green-soft: "#c3f0d2"
  brand-teal-deep: "#001e2b"
  brand-teal: "#003d4f"
  brand-teal-mid: "#00684a"
  accent-purple: "#7b3ff2"
  accent-orange: "#fa6e39"
  accent-pink: "#f06bb8"
  accent-blue: "#3d4f9f"
  canvas: "#ffffff"
  canvas-dark: "#001e2b"
  surface: "#f9fbfa"
  surface-soft: "#f4f7f6"
  surface-feature: "#e3fcef"
  hairline: "#e1e5e8"
  hairline-soft: "#eceff1"
  hairline-strong: "#c1ccd6"
  hairline-dark: "#1c2d38"
  ink: "#001e2b"
  charcoal: "#1c2d38"
  slate: "#3d4f5b"
  steel: "#5c6c7a"
  stone: "#7c8c9a"
  muted: "#a8b3bc"
  on-dark: "#ffffff"
  on-dark-muted: "#a8b3bc"
typography:
  hero-display:
    fontFamily: Euclid Circular A
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.10
    letterSpacing: -1.5px
  display-lg:
    fontFamily: Euclid Circular A
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -1px
  heading-1:
    fontFamily: Euclid Circular A
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: -0.5px
  heading-2:
    fontFamily: Euclid Circular A
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.5px
  heading-3:
    fontFamily: Euclid Circular A
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.30
  heading-4:
    fontFamily: Euclid Circular A
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.35
  heading-5:
    fontFamily: Euclid Circular A
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.40
  subtitle:
    fontFamily: Euclid Circular A
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.50
  body-md:
    fontFamily: Euclid Circular A
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Euclid Circular A
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
  body-sm-medium:
    fontFamily: Euclid Circular A
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.50
  caption-bold:
    fontFamily: Euclid Circular A
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.40
  micro-uppercase:
    fontFamily: Euclid Circular A
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 1px
  button-md:
    fontFamily: Euclid Circular A
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.30
  code-md:
    fontFamily: Source Code Pro
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
components:
  button-primary:
    backgroundColor: "{{colors.brand-green}}"
    textColor: "{{colors.on-primary}}"
    typography: "{{typography.button-md}}"
    rounded: "{{rounded.full}}"
    padding: "10px 22px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{{colors.ink}}"
    border: "1px solid {{colors.hairline-strong}}"
    typography: "{{typography.button-md}}"
    rounded: "{{rounded.full}}"
    padding: "10px 22px"
  card-base:
    backgroundColor: "{{colors.canvas}}"
    rounded: "{{rounded.lg}}"
    padding: "{{spacing.xl}}"
    border: "1px solid {{colors.hairline}}"
  card-feature-dark:
    backgroundColor: "{{colors.brand-teal-deep}}"
    textColor: "{{colors.on-dark}}"
    rounded: "{{rounded.lg}}"
    padding: "{{spacing.xxl}}"
  text-input:
    backgroundColor: "{{colors.canvas}}"
    textColor: "{{colors.ink}}"
    rounded: "{{rounded.md}}"
    padding: "{{spacing.sm}} {{spacing.md}}"
    border: "1px solid {{colors.hairline-strong}}"
    height: 44px
  chip:
    backgroundColor: "{{colors.brand-green}}"
    textColor: "{{colors.on-primary}}"
    typography: "{{typography.caption-bold}}"
    rounded: "{{rounded.full}}"
    padding: "4px 10px"
---
## Overview
MongoDB has a strong dual-mode visual identity using deep teals and high-contrast surfaces.

## Colors
Accent, brand, and canvas colors are mapped above.

## Typography
Euclid Circular A handles display and body prose.

## Layout
Rhythmic grid sizing uses a base 4px system.

## Components
Dynamic components are rendered live in Sandbox.
`;

// Hardcoded Neon Noir preset from getdesign.md-design.md
const NEON_NOIR_PRESET = `---
version: alpha
name: getdesign.md Neon Noir
description: A high-contrast, pixel-inflected dark system with a playful magenta accent and editorial information density.
colors:
  primary: "#ffb1ee"
  secondary: "#ededed"
  tertiary: "#8f8f8f"
  neutral: "#000000"
  surface: "#0a0a0a"
  on-surface: "#ededed"
  error: "#ff5a5a"
  border: "#2e2e2e"
  border-subtle: "#374151"
  overlay: "#1a1a1a"
typography:
  headline-display:
    fontFamily: GeistPixel-line
    fontSize: 48px
    fontWeight: 400
    lineHeight: 50.4px
    letterSpacing: 0px
  headline-lg:
    fontFamily: GeistPixel-Square
    fontSize: 36px
    fontWeight: 400
    lineHeight: 43px
  headline-md:
    fontFamily: Geist Mono
    fontSize: 28px
    fontWeight: 400
    lineHeight: 34px
  headline-sm:
    fontFamily: Geist
    fontSize: 21px
    fontWeight: 400
    lineHeight: 25px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 25.6px
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: 400
    lineHeight: 24px
  body-sm:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  label-sm:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 16px
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 2px
  sm: 10px
  md: 20px
  lg: 32px
  xl: 56px
components:
  button-primary:
    backgroundColor: "{{colors.surface}}"
    textColor: "{{colors.secondary}}"
    typography: "{{typography.body-md}}"
    rounded: "{{rounded.md}}"
    padding: "12px 20px"
    height: "41px"
  button-secondary:
    backgroundColor: "{{colors.overlay}}"
    textColor: "{{colors.tertiary}}"
    typography: "{{typography.body-md}}"
    rounded: "{{rounded.md}}"
    padding: "12px 20px"
    height: "41px"
  card:
    backgroundColor: "{{colors.neutral}}"
    textColor: "{{colors.primary}}"
    rounded: "{{rounded.lg}}"
    padding: "16px"
  input:
    backgroundColor: "{{colors.neutral}}"
    textColor: "{{colors.secondary}}"
    rounded: "{{rounded.md}}"
    padding: "12px 16px"
    height: "41px"
  chip:
    backgroundColor: "{{colors.primary}}"
    textColor: "{{colors.neutral}}"
    typography: "{{typography.label-sm}}"
    rounded: "{{rounded.sm}}"
    padding: "4px 8px"
  panel:
    backgroundColor: "{{colors.neutral}}"
    textColor: "{{colors.on-surface}}"
    rounded: "{{rounded.lg}}"
    padding: "16px"
---
## Overview
A technical catalog layout optimized for visual metadata structure, styled in retro pink & jet black.
`;

// Helper: Parse YAML frontmatter using a stack-based indentation parser
function parseSimpleYAML(yamlStr) {
    const lines = yamlStr.split('\n');
    const root = {};
    const stack = [root];
    const indents = [-1];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || !trimmed) continue;
        
        // Match key and value (if any)
        const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
        if (!match) continue;
        
        const indent = match[1].length;
        const key = match[2].trim();
        const val = match[3].trim().replace(/^['"]|['"]$/g, ''); // strip quotes
        
        // pop stack until indentation matches
        while (stack.length > 1 && indent <= indents[indents.length - 1]) {
            stack.pop();
            indents.pop();
        }
        
        const currentObj = stack[stack.length - 1];
        if (val !== "") {
            currentObj[key] = val;
        } else {
            currentObj[key] = {};
            stack.push(currentObj[key]);
            indents.push(indent);
        }
    }
    return root;
}

// Helper: Parse sections of the Markdown file
function parseMarkdownSections(mdText) {
    const sections = {};
    const yamlEndIdx = mdText.indexOf('---', 3);
    const bodyText = yamlEndIdx !== -1 ? mdText.substring(yamlEndIdx + 3).trim() : mdText;
    
    const parts = bodyText.split(/\n##\s+/);
    for (let part of parts) {
        const lines = part.split('\n');
        const title = lines[0].replace(/^##\s+/, '').trim();
        const content = lines.slice(1).join('\n').trim();
        if (title) {
            sections[title.toLowerCase()] = content;
        }
    }
    return sections;
}

// Helper: Resolve nested token values from strings like "{{colors.brand-green}}"
function resolveToken(value, tokens) {
    if (typeof value !== 'string') return value;
    return value.replace(/\{+([^}]+)\}+/g, (match, path) => {
        const parts = path.trim().split('.');
        let current = tokens;
        for (let part of parts) {
            if (current && current[part] !== undefined) {
                current = current[part];
            } else {
                return match; // fallback to original
            }
        }
        return current;
    });
}

// App Initialization
async function initApp() {
    setupEventListeners();
    await checkBackendStatus();
    loadHistory();
    
    // Automatically load MongoDB as default
    loadDesignSchema(MONGO_PRESET, "MongoDB-design-analysis", "https://www.mongodb.com/");
}

// Event Listeners setup
function setupEventListeners() {
    // Generate Form Submit
    document.getElementById("generator-form").addEventListener("submit", handleGenerateSubmit);
    
    // Modal controls removed (API key handled securely on backend)
    
    // Console controls
    document.getElementById("clear-console-btn").addEventListener("click", clearConsole);
    
    // Preset Buttons
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const url = btn.dataset.url;
            document.getElementById("target-url").value = url;
            
            // Check for hardcoded shortcuts
            if (url === "https://www.mongodb.com/") {
                loadDesignSchema(MONGO_PRESET, "MongoDB-design-analysis", url);
                logToConsole("Loaded pre-scraped MongoDB design specification.", "success");
            } else if (url === "https://getdesign.md") {
                loadDesignSchema(NEON_NOIR_PRESET, "getdesign.md Neon Noir", url);
                logToConsole("Loaded pre-scraped Neon Noir design system.", "success");
            } else {
                // Trigger real generation
                document.getElementById("generate-btn").click();
            }
        });
    });

    // Tab Links
    document.querySelectorAll(".workspace-tabs .tab-link").forEach(tab => {
        tab.addEventListener("click", (e) => {
            document.querySelectorAll(".workspace-tabs .tab-link").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-contents .tab-pane").forEach(pane => pane.classList.remove("active"));
            
            tab.classList.add("active");
            const targetPane = document.getElementById(tab.dataset.tab);
            targetPane.classList.add("active");
        });
    });

    // Copy / Download / Export Action buttons
    document.getElementById("btn-copy-md").addEventListener("click", copyMarkdown);
    document.getElementById("btn-download-md").addEventListener("click", downloadMarkdownFile);
    document.getElementById("btn-export-css").addEventListener("click", exportCSSProperties);

    // Sandbox Inputs changes updates playground live
    document.getElementById("sandbox-label-input").addEventListener("input", updateSandboxContent);
    document.getElementById("sandbox-body-textarea").addEventListener("input", updateSandboxContent);
    
    document.getElementById("theme-btn-dark").addEventListener("click", () => {
        document.getElementById("theme-btn-dark").classList.add("active");
        document.getElementById("theme-btn-light").classList.remove("active");
        document.getElementById("sandbox-render-area").classList.remove("light-canvas");
    });
    
    document.getElementById("theme-btn-light").addEventListener("click", () => {
        document.getElementById("theme-btn-light").classList.add("active");
        document.getElementById("theme-btn-dark").classList.remove("active");
        document.getElementById("sandbox-render-area").classList.add("light-canvas");
    });

    document.getElementById("sim-active-states").addEventListener("change", (e) => {
        const renderArea = document.getElementById("sandbox-render-area");
        if (e.target.checked) {
            renderArea.classList.add("simulate-active");
        } else {
            renderArea.classList.remove("simulate-active");
        }
    });

    // Temp range slider
    document.getElementById("temperature-slider").addEventListener("input", (e) => {
        document.getElementById("temp-val").textContent = e.target.value;
    });
}

// Fetch Backend Config & API keys status
async function checkBackendStatus() {
    const dot = document.querySelector("#api-status .status-dot");
    const txt = document.getElementById("api-status-text");
    const generateBtn = document.getElementById("generate-btn");
    const targetUrlInput = document.getElementById("target-url");

    try {
        const res = await fetch("/api/status");
        if (res.ok) {
            const data = await res.json();
            state.backendStatus = data;
            
            if (data.has_backend_key) {
                dot.className = "status-dot green";
                txt.textContent = "ENGINE ONLINE";
                generateBtn.disabled = false;
                targetUrlInput.disabled = false;
            } else {
                dot.className = "status-dot red";
                txt.textContent = "ENGINE OFFLINE (KEY MISSING)";
                generateBtn.disabled = true;
                targetUrlInput.disabled = true;
                generateBtn.innerHTML = '<i data-lucide="shield-alert"></i> <span>ENGINE OFFLINE: CONFIGURE KEY</span>';
                logToConsole("System warning: GEMINI_API_KEY is not configured on the server. Generation disabled.", "error");
            }
            
            // Populate select dropdown
            const modelSelect = document.getElementById("model-select");
            modelSelect.innerHTML = "";
            data.available_models.forEach(model => {
                const opt = document.createElement("option");
                opt.value = model;
                opt.textContent = model.replace("gemini-", "Gemini ");
                if (model === "gemini-2.5-flash") opt.selected = true;
                modelSelect.appendChild(opt);
            });
        } else {
            throw new Error("Bad response status");
        }
    } catch (err) {
        console.error("Backend server connection failed:", err);
        dot.className = "status-dot red";
        txt.textContent = "SERVER DISCONNECTED";
        generateBtn.disabled = true;
        targetUrlInput.disabled = true;
        generateBtn.innerHTML = '<i data-lucide="zap-off"></i> <span>SERVER OFFLINE</span>';
        logToConsole("Error: Cannot connect to generation backend.", "error");
    }
}

// Settings modal handlers removed

// Console Functions
function logToConsole(message, type = "system") {
    const consolePanel = document.getElementById("terminal-console");
    consolePanel.classList.remove("collapsed");
    
    const output = document.getElementById("console-output");
    const line = document.createElement("div");
    line.className = `console-line ${type}`;
    
    // Build timestamp prefix
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const ts = `${hh}:${mm}:${ss}`;
    
    // Map type to a short label prefix
    const prefixMap = {
        system: "SYS",
        success: "OK ",
        error: "ERR",
        warning: "WRN",
        info: "INF"
    };
    const prefix = prefixMap[type] || "LOG";
    
    const prefixEl = document.createElement("span");
    prefixEl.className = "console-line-prefix";
    prefixEl.textContent = `${ts} ${prefix}`;
    
    const msgEl = document.createElement("span");
    msgEl.textContent = message;
    
    line.appendChild(prefixEl);
    line.appendChild(msgEl);
    
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    
    // Update line count badge
    const lineCount = document.getElementById("console-line-count");
    if (lineCount) {
        const count = output.querySelectorAll(".console-line").length;
        lineCount.textContent = `${count} line${count !== 1 ? "s" : ""}`;
    }
}

function clearConsole() {
    const output = document.getElementById("console-output");
    output.innerHTML = "";
    const lineCount = document.getElementById("console-line-count");
    if (lineCount) lineCount.textContent = "0 lines";
    logToConsole("Console cleared.", "system");
}


// Handle Form generation
async function handleGenerateSubmit(e) {
    e.preventDefault();
    
    const url = document.getElementById("target-url").value.trim();
    const model = document.getElementById("model-select").value;
    const temp = parseFloat(document.getElementById("temperature-slider").value);
    
    if (!url) return;
    
    // Clear log and activate loading status
    clearConsole();
    logToConsole(`Initiating design extraction for URL: ${url}`, "system");
    
    const generateBtn = document.getElementById("generate-btn");
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i data-lucide="loader" class="spin"></i> <span>GENERATING...</span>';
    lucide.createIcons();
    
    const consolePulse = document.getElementById("console-pulse");
    consolePulse.className = "status-dot pulse red";

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                temperature: temp,
                model: model
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || "Generation request failed");
        }

        // Handle SSE stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop(); // keep partial line in buffer

            for (let line of lines) {
                if (line.startsWith('event:')) {
                    const eventType = line.replace('event:', '').trim();
                    // read next line for data
                    const dataLine = lines[lines.indexOf(line) + 1];
                    if (dataLine && dataLine.startsWith('data:')) {
                        const dataStr = dataLine.replace('data:', '').trim();
                        try {
                            const data = JSON.parse(dataStr);
                            if (eventType === 'log') {
                                logToConsole(data.message, "system");
                            } else if (eventType === 'error') {
                                logToConsole(data.message, "error");
                            } else if (eventType === 'result') {
                                logToConsole("Generation complete! Parsing design system schema...", "success");
                                loadDesignSchema(data.markdown, `design-analysis-${new URL(url).hostname}`, url);
                                saveToHistory(url, `design-analysis-${new URL(url).hostname}`, data.markdown);
                            }
                        } catch (pErr) {
                            console.error("Failed to parse SSE JSON:", pErr);
                        }
                    }
                }
            }
        }

    } catch (err) {
        logToConsole(`Error: ${err.message}`, "error");
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i data-lucide="zap"></i> <span>GENERATE SCHEMA</span>';
        lucide.createIcons();
        consolePulse.className = "status-dot red";
    }
}

// Parse and Load a Design System Markdown
function loadDesignSchema(mdText, name, sourceUrl) {
    state.markdown = mdText;
    
    // 1. Separate Frontmatter YAML from Markdown body
    const yamlRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
    const match = mdText.match(yamlRegex);
    
    if (match) {
        const yamlStr = match[1];
        state.parsedTokens = parseSimpleYAML(yamlStr);
    } else {
        logToConsole("Warning: Frontmatter YAML block not found! Parser might fail component styles.", "error");
        state.parsedTokens = {};
    }
    
    // 2. Parse Markdown body sections
    state.sections = parseMarkdownSections(mdText);
    
    // 3. Render raw markdown tab
    const codeOutput = document.getElementById("code-output");
    codeOutput.textContent = mdText;
    
    // Calculate line numbers
    const lines = mdText.split('\n');
    const gutter = document.getElementById("editor-gutter");
    gutter.innerHTML = "";
    for (let i = 1; i <= lines.length; i++) {
        const num = document.createElement("div");
        num.textContent = i;
        gutter.appendChild(num);
    }

    // 4. Render Specification Dashboard Preview
    renderSpecDashboard(name, sourceUrl);
    
    // 5. Inject Dynamic Component CSS Class styles
    injectComponentStyles();
    
    // 6. Build components inside Sandbox Playground
    renderSandboxComponents();
    
    // Switch visibility of empty dashboard
    document.getElementById("dashboard-empty-state").classList.add("hidden");
    document.getElementById("token-dashboard").classList.remove("hidden");
}

// Spec Dashboard Render
function renderSpecDashboard(name, sourceUrl) {
    // Info
    document.getElementById("token-project-name").textContent = state.parsedTokens.name || name;
    document.getElementById("token-project-desc").textContent = state.parsedTokens.description || "Parsed from reverse-engineered webpage.";
    document.getElementById("token-meta-version").textContent = state.parsedTokens.version || "alpha";
    document.getElementById("token-meta-engine").textContent = "Gemini LLM Engine";
    
    // 1. Render Colors Grid
    const colorsGrid = document.getElementById("color-token-grid");
    colorsGrid.innerHTML = "";
    if (state.parsedTokens.colors) {
        for (let [colorKey, hexVal] of Object.entries(state.parsedTokens.colors)) {
            if (typeof hexVal !== 'string') continue;
            
            const card = document.createElement("div");
            card.className = "color-card";
            card.title = `Click to copy HEX: ${hexVal}`;
            
            card.innerHTML = `
                <div class="color-swatch" style="background-color: ${hexVal}"></div>
                <div class="color-info">
                    <span class="color-name">${colorKey}</span>
                    <span class="color-hex">${hexVal}</span>
                </div>
            `;
            
            card.addEventListener("click", () => {
                navigator.clipboard.writeText(hexVal);
                logToConsole(`Copied color ${colorKey} (${hexVal}) to clipboard.`, "success");
            });
            colorsGrid.appendChild(card);
        }
    }

    // 2. Render Typography Hierarchy
    const typographyBody = document.getElementById("typography-token-body");
    typographyBody.innerHTML = "";
    if (state.parsedTokens.typography) {
        for (let [typoKey, specs] of Object.entries(state.parsedTokens.typography)) {
            if (typeof specs !== 'object') continue;
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="typography-token-name">${typoKey}</td>
                <td class="typography-font-cell" style="font-family: ${specs.fontFamily || 'inherit'}">${specs.fontFamily || '-'}</td>
                <td class="typography-val">${specs.fontSize || '-'}</td>
                <td class="typography-val">${specs.fontWeight || '-'}</td>
                <td class="typography-val">${specs.lineHeight || '-'}</td>
            `;
            typographyBody.appendChild(tr);
        }
    }

    // 3. Render Border Radius
    const radiusList = document.getElementById("radius-token-list");
    radiusList.innerHTML = "";
    if (state.parsedTokens.rounded) {
        for (let [radKey, radVal] of Object.entries(state.parsedTokens.rounded)) {
            const item = document.createElement("div");
            item.className = "token-list-item";
            item.innerHTML = `
                <span class="t-key">${radKey}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="t-val">${radVal}</span>
                    <div class="radius-preview" style="border-radius: ${radVal}"></div>
                </div>
            `;
            radiusList.appendChild(item);
        }
    } else {
        radiusList.innerHTML = '<div class="history-empty">No rounded tokens found</div>';
    }

    // 4. Render Spacing System
    const spacingList = document.getElementById("spacing-token-list");
    spacingList.innerHTML = "";
    if (state.parsedTokens.spacing) {
        for (let [spKey, spVal] of Object.entries(state.parsedTokens.spacing)) {
            const item = document.createElement("div");
            item.className = "token-list-item";
            
            // Generate visual bars scale representation
            const pixels = parseInt(spVal) || 0;
            const barWidth = Math.min(80, pixels * 2);
            
            item.innerHTML = `
                <span class="t-key">${spKey}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="t-val">${spVal}</span>
                    <span class="spacing-preview-bar" style="width: ${barWidth}px;"></span>
                </div>
            `;
            spacingList.appendChild(item);
        }
    } else {
        spacingList.innerHTML = '<div class="history-empty">No spacing tokens found</div>';
    }

    // 5. Render Overview & Gaps
    const overviewText = document.getElementById("system-overview-text");
    overviewText.innerHTML = "";
    
    // Overview description
    if (state.sections.overview) {
        const h = document.createElement("div");
        h.className = "overview-section";
        h.innerHTML = `<h4>📋 Brand Overview</h4><p>${state.sections.overview.substring(0, 280)}${state.sections.overview.length > 280 ? "…" : ""}</p>`;
        overviewText.appendChild(h);
    }
    
    // Token stats row
    const colors = state.parsedTokens.colors ? Object.keys(state.parsedTokens.colors).length : 0;
    const typo = state.parsedTokens.typography ? Object.keys(state.parsedTokens.typography).length : 0;
    const comps = state.parsedTokens.components ? Object.keys(state.parsedTokens.components).length : 0;
    const spacing = state.parsedTokens.spacing ? Object.keys(state.parsedTokens.spacing).length : 0;
    
    const statsEl = document.createElement("div");
    statsEl.className = "overview-stats";
    statsEl.innerHTML = `
        <div class="overview-stat"><span class="stat-val">${colors}</span><span class="stat-key">Colors</span></div>
        <div class="overview-stat"><span class="stat-val">${typo}</span><span class="stat-key">Type Styles</span></div>
        <div class="overview-stat"><span class="stat-val">${comps}</span><span class="stat-key">Components</span></div>
        <div class="overview-stat"><span class="stat-val">${spacing}</span><span class="stat-key">Spacing</span></div>
    `;
    overviewText.appendChild(statsEl);
    
    // Do's and Don'ts info
    if (state.sections["do's and don'ts"] || state.sections["do and don't"] || state.sections["dos and don'ts"]) {
        const content = state.sections["do's and don'ts"] || state.sections["do and don't"] || state.sections["dos and don'ts"];
        const lines = content.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('•')).slice(0, 3);
        if (lines.length > 0) {
            const h = document.createElement("div");
            h.className = "overview-section";
            h.innerHTML = `<h4>✅ Design Principles</h4><p>${lines.map(l => l.replace(/^[-•]\s*/, '')).join(' · ')}</p>`;
            overviewText.appendChild(h);
        }
    }
    
    // Known gaps info
    if (state.sections["known gaps"]) {
        const lines = state.sections["known gaps"].split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('•')).slice(0, 2);
        if (lines.length > 0) {
            const h = document.createElement("div");
            h.className = "overview-section";
            h.innerHTML = `<h4>⚠️ Known Gaps</h4><p>${lines.map(l => l.replace(/^[-•]\s*/, '')).join(' · ')}</p>`;
            overviewText.appendChild(h);
        }
    }
    
    if (overviewText.innerHTML === "") {
        overviewText.innerHTML = '<div class="history-empty">No overview data found in design.md</div>';
    }
}


// CSS Variable Injection to support Component styling preview live
function injectComponentStyles() {
    let css = ':root {\n';
    
    // Build root color/radius/spacing specs dynamically
    if (state.parsedTokens.colors) {
        for (let [name, val] of Object.entries(state.parsedTokens.colors)) {
            if (typeof val === 'string') {
                css += `  --dyn-color-${name}: ${val};\n`;
            }
        }
    }
    
    if (state.parsedTokens.rounded) {
        for (let [name, val] of Object.entries(state.parsedTokens.rounded)) {
            css += `  --dyn-rounded-${name}: ${val};\n`;
        }
    }
    
    if (state.parsedTokens.spacing) {
        for (let [name, val] of Object.entries(state.parsedTokens.spacing)) {
            css += `  --dyn-spacing-${name}: ${val};\n`;
        }
    }
    
    css += '}\n\n';
    
    // Build component level classes based on parsed YAML frontmatter components
    if (state.parsedTokens.components) {
        for (let [compName, compProps] of Object.entries(state.parsedTokens.components)) {
            if (typeof compProps !== 'object') continue;
            
            // Standard state styling selector class
            css += `.dyn-${compName} {\n`;
            css += `  transition: all 0.2s ease-in-out;\n`;
            css += `  box-sizing: border-box;\n`;
            
            for (let [prop, val] of Object.entries(compProps)) {
                let resolved = resolveToken(val, state.parsedTokens);
                
                // Map camelCase keys to CSS dashed keys
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                
                if (cssProp === 'typography') {
                    // Extract typography subobject
                    if (typeof resolved === 'object') {
                        for (let [tProp, tVal] of Object.entries(resolved)) {
                            const tCssProp = tProp.replace(/([A-Z])/g, '-$1').toLowerCase();
                            css += `  ${tCssProp}: ${tVal};\n`;
                        }
                    }
                } else if (cssProp === 'text-color') {
                    css += `  color: ${resolved};\n`;
                } else {
                    css += `  ${cssProp}: ${resolved};\n`;
                }
            }
            css += '}\n\n';
            
            // Hover styles derived automatically (e.g. slight opacity or border brightness)
            css += `.dyn-${compName}:hover {\n`;
            css += `  opacity: 0.9;\n`;
            css += `  filter: brightness(1.05);\n`;
            // If it is an input, focus border glow
            if (compName.includes('input')) {
                css += `  border-color: var(--dyn-color-primary, #ffffff) !important;\n`;
            }
            css += '}\n\n';
            
            // Pressed or Active states support
            css += `.dyn-${compName}:active, .simulate-active .dyn-${compName} {\n`;
            // Check if there is a defined pressed variant in tokens, e.g. button-primary-pressed
            const pressedVariantKey = `${compName}-pressed`;
            if (state.parsedTokens.components[pressedVariantKey]) {
                const pProps = state.parsedTokens.components[pressedVariantKey];
                for (let [pProp, pVal] of Object.entries(pProps)) {
                    let pResolved = resolveToken(pVal, state.parsedTokens);
                    const pCssProp = pProp.replace(/([A-Z])/g, '-$1').toLowerCase();
                    if (pCssProp === 'text-color') {
                        css += `  color: ${pResolved};\n`;
                    } else {
                        css += `  ${pCssProp}: ${pResolved};\n`;
                    }
                }
            } else {
                css += `  transform: scale(0.98);\n`;
                css += `  filter: brightness(0.9);\n`;
            }
            css += '}\n\n';
        }
    }
    
    // Add active sandbox override simulation helper
    css += `.simulate-active .dyn-input:focus {\n`;
    css += `  border-color: var(--dyn-color-primary, #ffffff) !important;\n`;
    css += '}\n';

    // Inject or update
    let styleTag = document.getElementById('dynamic-design-styles');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-design-styles';
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
}

// Render Components in Playground Canvas
function renderSandboxComponents() {
    const sandboxContent = document.getElementById("sandbox-content");
    const sandboxEmpty = document.getElementById("sandbox-empty");
    
    if (!state.parsedTokens.components) {
        sandboxContent.classList.add("hidden");
        sandboxEmpty.classList.remove("hidden");
        return;
    }
    
    sandboxContent.classList.remove("hidden");
    sandboxEmpty.classList.add("hidden");
    
    // Containers
    const btnContainer = document.getElementById("sandbox-buttons-container");
    const chipContainer = document.getElementById("sandbox-chips-container");
    const inputContainer = document.getElementById("sandbox-inputs-container");
    const cardContainer = document.getElementById("sandbox-cards-container");
    
    btnContainer.innerHTML = "";
    chipContainer.innerHTML = "";
    inputContainer.innerHTML = "";
    cardContainer.innerHTML = "";
    
    const label = document.getElementById("sandbox-label-input").value || "Action Button";
    const bodyText = document.getElementById("sandbox-body-textarea").value || "Sample description text";

    for (let compName of Object.keys(state.parsedTokens.components)) {
        // Skip pressed/disabled state tokens themselves (we handle them on active/hover classes)
        if (compName.endsWith("-pressed") || compName.endsWith("-disabled") || compName.endsWith("-active") || compName.endsWith("-focused")) {
            continue;
        }
        
        const wrapper = document.createElement("div");
        wrapper.className = "sandbox-item-container";
        
        const tag = document.createElement("span");
        tag.className = "sandbox-item-tag";
        tag.textContent = compName;
        wrapper.appendChild(tag);

        if (compName.includes("button")) {
            const btn = document.createElement("button");
            btn.className = `dyn-${compName} dynamic-component`;
            btn.textContent = label;
            wrapper.appendChild(btn);
            btnContainer.appendChild(wrapper);
        } else if (compName.includes("chip") || compName.includes("badge") || compName.includes("tag")) {
            const chip = document.createElement("span");
            chip.className = `dyn-${compName} dynamic-component`;
            chip.textContent = label;
            chip.style.display = "inline-flex";
            chip.style.alignItems = "center";
            chip.style.justifyContent = "center";
            wrapper.appendChild(chip);
            chipContainer.appendChild(wrapper);
        } else if (compName.includes("input") || compName.includes("search") || compName.includes("field")) {
            const inp = document.createElement("input");
            inp.type = "text";
            inp.className = `dyn-${compName} dynamic-component`;
            inp.placeholder = "Enter text metadata...";
            inp.value = "";
            wrapper.style.width = "100%";
            wrapper.appendChild(inp);
            inputContainer.appendChild(wrapper);
        } else if (compName.includes("card") || compName.includes("panel") || compName.includes("tile")) {
            const card = document.createElement("div");
            card.className = `dyn-${compName} dynamic-component`;
            
            const cardHeading = document.createElement("h4");
            cardHeading.style.marginBottom = "8px";
            cardHeading.style.fontFamily = "inherit";
            cardHeading.textContent = "Feature Showcase";
            
            const cardP = document.createElement("p");
            cardP.style.fontFamily = "inherit";
            cardP.style.fontSize = "13px";
            cardP.style.lineHeight = "1.4";
            cardP.textContent = bodyText;
            
            card.appendChild(cardHeading);
            card.appendChild(cardP);
            wrapper.appendChild(card);
            cardContainer.appendChild(wrapper);
        }
    }
}

// Update Sandbox content when inputs change
function updateSandboxContent() {
    renderSandboxComponents();
}

// History Local Storage Manager
function saveToHistory(url, title, markdown) {
    const historyItem = {
        id: Date.now(),
        url: url,
        title: title,
        markdown: markdown,
        timestamp: new Date().toISOString()
    };
    
    // Load existing
    let items = [];
    try {
        items = JSON.parse(localStorage.getItem("design_gen_history")) || [];
    } catch (e) {
        items = [];
    }
    
    // Filter duplicates
    items = items.filter(i => i.url !== url);
    items.unshift(historyItem); // add to top
    
    // Keep max 10
    if (items.length > 10) items.pop();
    
    localStorage.setItem("design_gen_history", JSON.stringify(items));
    loadHistory();
}

function loadHistory() {
    const container = document.getElementById("history-container");
    container.innerHTML = "";
    
    let items = [];
    try {
        items = JSON.parse(localStorage.getItem("design_gen_history")) || [];
    } catch (e) {
        items = [];
    }
    
    if (items.length === 0) {
        container.innerHTML = '<div class="history-empty">No previous designs saved locally</div>';
        return;
    }
    
    items.forEach(item => {
        const el = document.createElement("div");
        el.className = "history-item";
        
        el.innerHTML = `
            <span class="hist-title">${item.title}</span>
            <span class="hist-url">${item.url}</span>
        `;
        
        el.addEventListener("click", () => {
            loadDesignSchema(item.markdown, item.title, item.url);
            document.getElementById("target-url").value = item.url;
            logToConsole(`Loaded design history for: ${item.url}`, "success");
        });
        
        container.appendChild(el);
    });
}

// Action button trigger functions
function copyMarkdown() {
    if (!state.markdown) return;
    navigator.clipboard.writeText(state.markdown);
    logToConsole("Copied raw design.md markdown to clipboard.", "success");
}

function downloadMarkdownFile() {
    if (!state.markdown) return;
    const blob = new Blob([state.markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logToConsole("Downloaded `design.md` file successfully.", "success");
}

function exportCSSProperties() {
    let css = `/* Generated from design.md tokens */\n:root {\n`;
    
    if (state.parsedTokens.colors) {
        for (let [name, val] of Object.entries(state.parsedTokens.colors)) {
            if (typeof val === 'string') {
                css += `  --color-${name}: ${val};\n`;
            }
        }
    }
    
    if (state.parsedTokens.rounded) {
        for (let [name, val] of Object.entries(state.parsedTokens.rounded)) {
            css += `  --rounded-${name}: ${val};\n`;
        }
    }
    
    if (state.parsedTokens.spacing) {
        for (let [name, val] of Object.entries(state.parsedTokens.spacing)) {
            css += `  --spacing-${name}: ${val};\n`;
        }
    }
    
    css += '}\n';
    
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "variables.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logToConsole("CSS Custom Properties exported as `variables.css`", "success");
}
