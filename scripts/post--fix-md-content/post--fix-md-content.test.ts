import { normalizeUrls, addLineNumbers, renderGitLabMD, transformMdxFrontmatter, processFrontmatter, processMdContent } from './post--fix-md-content';

Deno.test("normalizeUrls: no URLs", () => {
    const normalized = normalizeUrls("Hello world");
    if (normalized !== "Hello world") {
        throw new Error("Expected 'Hello world', got: " + JSON.stringify(normalized));
    }
});

Deno.test("normalizeUrls: https only", () => {
    const normalized = normalizeUrls("Check out https://example.com for more info");
    if (normalized !== "Check out https://example.com for more info") {
        throw new Error("Expected unchanged, got: " + JSON.stringify(normalized));
    }
});

Deno.test("normalizeUrls: http to https", () => {
    const normalized = normalizeUrls("Check http://example.com for more info");
    if (!normalized.includes("https://example.com")) {
        throw new Error("Expected https://example.com, got: " + JSON.stringify(normalized));
    }
});

Deno.test("normalizeUrls: http www to https www", () => {
    const normalized = normalizeUrls("Check http://www.example.com");
    if (!normalized.includes("https://www.example.com") && !normalized.includes("https://www.example.com.")) {
        throw new Error("Expected https, got: " + JSON.stringify(normalized));
    }
});

Deno.test("normalizeUrls: https www stays same", () => {
    const normalized = normalizeUrls("Check https://www.example.com");
    if (normalized !== "Check https://www.example.com") {
        throw new Error("Expected unchanged, got: " + JSON.stringify(normalized));
    }
});

Deno.test("addLineNumbers: adds numbers", () => {
    const lines = ["Hello", "World", "# Header"];
    const result = addLineNumbers(lines);
    if (result[0] !== "1: Hello" || result[1] !== "2: World") {
        throw new Error("Line numbers not added correctly");
    }
});

Deno.test("renderGitLabMD: frontmatter conversion", async () => {
    const result = await renderGitLabMD("---\nformat: markdown\n---\n\nContent", "test");
    if (!result.startsWith("---")) {
        throw new Error("Frontmatter not preserved");
    }
});

Deno.test("transformMdxFrontmatter: converts mdx format", async () => {
    const result = await transformMdxFrontmatter("---\nfrontmatter:\n---\n\n[Content]");
    if (!result.includes("---\nformat: markdown\n---\n")) {
        throw new Error("Frontmatter not converted properly");
    }
});
