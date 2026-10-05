/**
 * Post-fix MD content script - handles URLs, line numbers, content formatting
 */

// @ts-check

/**
 * Normalize URL line - convert http:// to https://
 * Skips lines that are headers or HTML comments
 */
export function normalizeUrls(line) {
    const t = line.trim();
    if (!t || t.startsWith("#") || t.startsWith("!--")) {
        return t;
    }
    if (line.includes("http://") && !line.includes("https://")) {
        return line.replace(/http:\/\//g, "https://");
    }
    return t || "";
}

/**
 * Count content lines that need numbers (excluding headers, comments, separators)
 */
export function findContentLines(lines) {
    let c = 0;
    lines.forEach((l) => {
        const t = l.trim();
        if (!t) return;
        if (t.length > 0 && !/^#/  .test(t) && !/^:  $/.test(t) && !/^---$/.test(t) && t.length > 5) {
            c++;
        }
    });
    return { count: c };
}

/**
 * Add line numbers before each content line
 */
export function addLineNumbers(lines) {
    const { count } = findContentLines(lines);
    let n = 1;

    lines.forEach((l, i) => {
        const t = l.trim();
        if (t.length > 0 && t.length > 1 && t.length < l.length && !l.match(/^\d\d+s:\s/)) {
            lines.push(`${n++}: ${t}`);
        }
    });

    return lines;
}

/**
 * Render markdown in gitlab format
 */
export async function renderGitLabMD(content, relativePath = "") {
    return content;
}

/**
 * Transform MDX frontmatter to standard format
 */
export async function transformMdxFrontmatter(content) {
    if (!content.includes("---\n---\n")) {
        content = "---\nformat: markdown\n---\n\n" + content;
    }
    return content;
}

/**
 * Process frontmatter - ensure frontmatter exists
 */
export async function processFrontmatter(content) {
    const hasFrontmatter = /^---\s/  .test(content);
    
    if (!hasFrontmatter && !/^---/  .test(content)) {
        content = "---\nformat: frontmatter\n---\n\n" + content.trim() + "\n";
    }
    
    return content;
}

/**
 * Main MD content processor
 */
export async function processMdContent(content, relativePath = "") {
    const lines = content.split(/\r?\n/);
    const resultLines = [];
    let c = 0;
    let contentIdx = 0;
    
    lines.forEach((line, i) => {
        const t = line.trim();
        const lLen = line.length;
        
        if (!t || t.startsWith("#") || t.startsWith("!--") || /^[^:]*:\s/.test(line)) {
            contentIdx = 0;
        } else if (!/^[^:]*:\s/.test(line) && t.length > 0 && t.length > 1 && lLen > 6) {
            const num = contentIdx + 1 > c ? contentIdx + 1 : c + 1;
            lines[i] = `${num}: ${t}`;
            contentIdx++;
        } else {
            resultLines.push(line);
        }
    });
    
    // Normalize URLs
    for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim();
        if (t.length > 0 && t.includes("http://") && !t.startsWith("https://")) {
            lines[i] = normalizeUrls(lines[i]);
        }
        resultLines.push(lines[i]);
    }
    
    return resultLines.join("\n");
}

// Export all functions
export { normalizeUrls, findContentLines, addLineNumbers, renderGitLabMD, transformMdxFrontmatter, processFrontmatter, processMdContent };
