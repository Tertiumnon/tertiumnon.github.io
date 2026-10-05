import { normalizeUrls, findContentLines, addLineNumbers, processFrontlink, normalizeUrls as nu, renderGitLabMD, transformMdxFrontmatter, processFrontmatter, processMdContent }

/**
 * Process MD content
 */

export async function processMdContent(content) {
    const lines = content.split("\n");
    const resultLines = [];
    const { count: contentCount } = calculateContentLines(lines);
    let contentIndex = 0;
    
    lines.forEach((line, i) => {
        const t = line.trim();
        
        // Skip headers and add to contentIndex
        if (t.startsWith("#")) {
            contentIndex = 0;
        } else if (!resultLines.length && !t.trim()) {
            contentIndex = 0;
        }
        
        // Content line
        if (t && t.length > 0 && !t.startsWith("#") && !t.startsWith("!--") && !t.startsWith("---")) {
            const lineNum = contentIndex + 1;
            
            // Normalize URLs
            if (line.includes("http://")) {
                lines[i] = normalizeUrls(line);
            }
            
            resultLines.push(`${lineNum}. ` + lines[i].trim());
            contentIndex++;
        } else {
            resultLines.push(line);
        }
    });
    
    return resultLines.join("\n");
}

/**
 * Calculate content line count
 */

function calculateContentLines(lines) {
    let count = 0;
    lines.forEach(l => {
        const t = l.trim();
        if (t && t.length > 0 && !t.startsWith("#") && !t.startsWith("!--") && !t.startsWith("---")) {
            count++;
        }
    });
    return { count };
}

// Export all functions
export { normalizeUrls, findContentLines, addLineNumbers, processFrontlink, normalizeUrls as nu, renderGitLabMD, transformMdxFrontmatter, processFrontmatter };
