---
publishedAt: 2020-05-10
categories: ["Hacks"]
tags: ["Tips"]
---

# Visual Studio 2019: LF Line Endings

To configure Visual Studio 2019 to use LF line endings by default, create a `.editorconfig` file in your project root:

```
[*]
end_of_line = lf
```

This ensures all files in the project will use LF instead of Windows default CRLF.
