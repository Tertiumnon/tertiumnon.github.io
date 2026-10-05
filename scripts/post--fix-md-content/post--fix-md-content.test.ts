import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { fixMarkdownContent } from './post--fix-md-content';

describe('fixMarkdownContent - Code Block Safety', () => {
  let tempFilePath: string;

  beforeEach(() => {
    tempFilePath = 'temp-test-file.md';
  });

  afterEach(() => {
    // Clean up the test file
    try {
      writeFileSync(tempFilePath, '');
    } catch {
      // Ignore errors during cleanup
    }
  });

  it('should remove extra "---" markers after the first 5 lines', () => {
    const originalContent = `---
---
---
---
---
---
extra line 1
extra line 2
---
---
---
`;

    const expectedContent = `---
---
---
---
---
extra line 1
extra line 2
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });

  it('should ensure first header is "# "', () => {
    const originalContent = `# Header 1
## Header 2
### Header 3
`;

    const expectedContent = `# Header 1
## Header 2
### Header 3
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });

  it('should convert first header from "#Header" to "# Header"', () => {
    const originalContent = `#Header 1
## Header 2
### Header 3
`;

    const expectedContent = `# Header 1
## Header 2
### Header 3
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });

  it('should handle "# #" pattern correctly by converting it to "# "', () => {
    const originalContent = `# Header 1
# # Header 2
### Header 3
`;

    const expectedContent = `# Header 1
# Header 2
## Header 3
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });

  it('should handle code blocks without modifying headers inside them', () => {
    const originalContent = `# Main Header

This is regular content.

\`\`\`javascript
# This should NOT be changed to ## Header
function test() {
  return "# Header inside code block";
}
\`\`\`

More regular content.

## Sub Header
`;

    const expectedContent = `# Main Header

This is regular content.

\`\`\`javascript
# This should NOT be changed to ## Header
function test() {
  return "# Header inside code block";
}
\`\`\`

More regular content.

## Sub Header
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });

  it('should handle multiple code blocks', () => {
    const originalContent = `# Main Title

\`\`\`json
{
  "header": "# This should not be processed"
}
\`\`\`

## Section 1

\`\`\`bash
# Another code block with # header
echo "test"
\`\`\`

### Section 2
`;

    const expectedContent = `# Main Title

\`\`\`json
{
  "header": "# This should not be processed"
}
\`\`\`

## Section 1

\`\`\`bash
# Another code block with # header
echo "test"
\`\`\`

### Section 2
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });

  it('should handle nested code blocks properly', () => {
    const originalContent = `# Main Header

\`\`\`markdown
# This is markdown inside code block
## Should not be affected
\`\`\`

## Sub Header
`;

    const expectedContent = `# Main Header

\`\`\`markdown
# This is markdown inside code block
## Should not be affected
\`\`\`

## Sub Header
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });

  it('should maintain proper header hierarchy with code blocks', () => {
    const originalContent = `---
---
---
---
---
---
# Introduction

Some content here.

\`\`\`typescript
interface MyInterface {
  # property: string;  // This should not affect header processing
}
\`\`\`

## Why This Matters
### Background Info
#### Detailed Explanation
`;

    const expectedContent = `---
---
---
---
---
---
# Introduction

Some content here.

\`\`\`typescript
interface MyInterface {
  # property: string;  // This should not affect header processing
}
\`\`\`

## Why This Matters
### Background Info
#### Detailed Explanation
`;

    writeFileSync(tempFilePath, originalContent);
    fixMarkdownContent(tempFilePath);
    const result = readFileSync(tempFilePath, 'utf-8');
    
    expect(result).toBe(expectedContent);
  });
});