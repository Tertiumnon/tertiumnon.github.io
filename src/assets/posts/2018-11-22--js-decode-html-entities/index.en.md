---
publishedAt: 2018-11-22
category: Programming
tags: ["JavaScript","Web Development"]
---

# JS: How to Decode HTML Entities

JavaScript lacks built-in methods for encoding and decoding HTML entities. Use DOM manipulation as a workaround.

## Decode HTML Entities

**Vanilla JS:**

```javascript
function decodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}
```

**jQuery:**

```javascript
function decodeHTMLEntities(text) {
  return $("<textarea/>").html(text).text();
}
```

## Encode HTML Entities

**Vanilla JS:**

```javascript
function encodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerText = text;
  return textArea.innerHTML;
}
```

**jQuery:**

```javascript
function encodeHTMLEntities(text) {
  return $("<textarea/>").text(text).html();
}
```
