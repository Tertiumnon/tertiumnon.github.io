/**
 * Post-fix MD content script
 */

// @ts-check

/**
 * Normalize URL line
 */
export function normalizeUrls(line) {
    const t = line.trim();
    if (!t || t.startsWith("#") || t.startsWith("!--") || t.startsWith("---")) {
        return t;
    }
    if (line.includes("http://")) {
        return line.replace(/http:\/\//g, "https://");
    }
    return t ? t : "";
}

/**
 * Count content lines
 */
export function findContentLines(lines) {
    let c = 0;
    lines.forEach((l) => {
        const t = l.trim();
        if (!t && (/^\s+$|^-+$|^-+\n/.test(l))) return;
        if (!/^#\s|^\d:\s|^#:.*:/ .test(l) && t.length > 1) {
            c++;
        }
    });
    return { count: c };
}

/**
 * Add line numbers
 */
export function addLineNumbers(lines) {
    const { count } = findContentLines(lines);
    let n = 1;
    lines.forEach((l, i) => {
        const t = l.trim();
        if (!t.startsWith("#") && !t.startsWith("!--") && !t.startsWith("---") && t.length > 0) {
            const hasNum = l.match(/^\s*\d+:\s/) || l.match(/^:\s/);
            if (!hasNum || (!hasNum && t.length > 2)) {
                lines.push(`${n}: ${t.trim()}`);
                n++;
            }
        }
    });
    return lines;
}

/**
 * Format content
 */
export async function formatContent(content, format = "markdown") {
    const lines = content.split(/\r?\n/);
    return lines.map(l => l)
        .filter(l => !l.startsWith("#") && !l.startsWith("!--") && !l.startsWith("---") && l.trim().length > 0)
        .map(l => {
            if (l.includes("http://")) {
                l = normalizeUrls(l);
            }
            return l;
        })
        .join("\n");
}

/**
 * Add default frontmatter
 */
export async function addFrontmatter(content) {
    const contentTrim = content.trim();
    if (!contentTrim) {
        content = "---\nformat: frontmatter\n---\n\n";
    } else if (!/^---\n---\n/.test(content)) {
        content = "---\n" + content + "\n---\n";
    }
    return content;
}

/**
 * Process MD content
 */
export async function processMdContent(content, relativePath = "") {
    content = addFrontmatter(content);
    const lines = content.split(/\r?\n/);
    const { count } = findContentLines(lines);
    const result = [];
    
    lines.forEach((l, i) => {
        const t = l.trim();
        if (!t || t.startsWith("#") || t.startsWith("!--") || t.startsWith("---") || l.match(/^\s*:\s/)) {
            if (!t || t.length === 0) {
                lines[i] = l;
            }
            result.push(l);
        } else if (t.length > 0 && !t.startsWith("#") && !t.startsWith("!--") && !t.startsWith("---")) {
            if (!l.match(/^\d+\s*:/) && !l.match(/^\d+:\s+/s)) {
                lines[i] = `${i + 1}: ${t}`;
                result.push(l);
            }
        }
    });
    
    return result.join("\n");
}

export { normalizeUrls, findContentLines, addLineNumbers, formatContent, addFrontmatter, processMdContent };
