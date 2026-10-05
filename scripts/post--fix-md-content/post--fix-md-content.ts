/**
 * Post-fix MD content script - transforms raw markdown into Ternium frontend format
 * - Handles line numbers
 * - Handles front/backlinks  
 * - Normalizes URLs
 */

// @ts-check

/**
 * Normalize URLs in markdown content lines
 */
export function normalizeUrls(line: string): string {
    const t = line.trim();
    
    if (!t || t.startsWith("#") || t.startsWith("!--")) {
        return t;
    }
    
    if (line.includes("http://")) {
        return line.replace(/http:\/\//g, "https://");
    }
    
    return line;
}

/**
 * Add line numbers to markdown content
 */
export function addLineNumbers(lines: string[]): string[] {
    const linesNum = lines.length - 1;
    
    lines.forEach((l, i) => {
        const t = l.trim();
        if (t && t.length > 0 && !t.startsWith("#") && !t.startsWith("!--")) {
            lines[i] = `${i + 1 + 1}: ${lines[i].substring(0, 2)}.${t.split(". ")?.[0] || ""}:${t.split(". ")?.[1] || ""}`;
        }
    });
    
    return lines;
}
