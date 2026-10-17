---
publishedAt: 2018-11-22
updatedAt: 2026-10-15
category: Programming
tags: ["JavaScript","Web Development"]
---

# JS: How to Decode HTML Entities

JavaScript lacks built-in methods for encoding and decoding HTML entities. There is no `String` method for character references today — if a backend hands you `&lt;p&gt;text&lt;/p&gt;`, you decode it yourself. Use DOM manipulation as a workaround; the DOM knows the full HTML entity table, which is why the trick is short. But the task itself doesn't require the DOM — see the portable version further down.

## Decode HTML Entities

**Vanilla JS:**

```javascript
function decodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

decodeHTMLEntities('&lt;p&gt;hello&lt;/p&gt;'); // "<p>hello</p>"
```

Why a `<textarea>`: its content is raw text, not markup. Nothing inside becomes an element, a `<script>` tag stays plain text, and the parser only substitutes character references. Reading `.value` gives you that text back.

**jQuery:**

```javascript
function decodeHTMLEntities(text) {
  return $('<textarea/>').html(text).text();
}
```

Same mechanism — jQuery builds the detached node behind the scenes. Only worth it if you already ship jQuery.

## Encode HTML Entities

Same node, opposite direction: assign text, read markup.

**Vanilla JS:**

```javascript
function encodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.textContent = text;
  return textArea.innerHTML;
}
```

Older snippets use `innerText` here. It happens to work on a detached `<textarea>`, but `textContent` is the standard property — prefer it.

**jQuery:**

```javascript
function encodeHTMLEntities(text) {
  return $('<textarea/>').text(text).html();
}
```

## When there is no DOM

Browser code shouldn't be forced to build elements, and this doesn't run in Node/Bun/Worker contexts anyway (`document` is absent). A dependency-free decoder works in any JS runtime, verified on Bun v1.4:

```javascript
const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  nbsp: '\u00A0', copy: '\u00A9', hellip: '\u2026', mdash: '\u2014',
};

function decodeHtmlEntities(text) {
  return text.replace(/&(#[xX][0-9A-Fa-f]+|#[0-9]+|[A-Za-z][0-9A-Za-z]*);/g, function (match) {
    const body = match.slice(1, -1); // drop '&' and ';'

    if (!body.startsWith('#')) {
      return NAMED_ENTITIES[body.toLowerCase()] ?? match;
    }

    const isHex = body[1] === 'x' || body[1] === 'X';
    const digits = isHex ? body.slice(2) : body.slice(1);
    const codePoint = parseInt(digits, isHex ? 16 : 10);
    if (Number.isNaN(codePoint) || codePoint < 0 || codePoint > 0x10FFFF) return match;

    return String.fromCodePoint(codePoint);
  });
}

decodeHtmlEntities('&lt;p&gt;hi&lt;/p&gt;'); // "<p>hi</p>"
decodeHtmlEntities('&#38;&#64; &#x41;');     // "&@ A"
decodeHtmlEntities('&#x1F60D;');             // "😍" — astral planes work
decodeHtmlEntities('&notathing;');          // "&notathing;" — unknown name kept as-is
```

The map holds only the names you list, so keep it short and honest: leaving an unknown entity untouched is better than guessing wrong. For full HTML5 tables use a library (`he` on Node/Bun) instead of pasting thousands of names here.

## Gotchas that bite later

**One pass only.** `decodeHtmlEntities('&amp;lt;p&gt;')` returns `&lt;p>`, not `<p>` — the input was double-escaped, so one pass leaves a half-decoded string behind. Decode twice and previously inert markup becomes live markup, and a careless `innerHTML = ...` assignment turns into an XSS vector. Decode once, then insert with `textContent`.

**Trailing `;` is required.** `&amp` and other legacy entity forms without a semicolon are not decoded — neither by the `<textarea>` trick (raw-text tokenizer demands the full form) nor by the version above. Sanitize legacy entity soup before decoding, don't expect HTML-parser leniency.

**Quotes are not escaped.** Serializing text inside a raw-text element escapes only `&`, `<` and `>`. So `encodeHTMLEntities('a "b"')` leaves both quotes intact — harmless between tags, unsafe as an attribute value.

```javascript
function encodeForAttributes(value) {
  return value
    .replace(/&/g, '&amp;') // must be first, or we re-escape our own output
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

encodeForAttributes('a & < > " \''); // 'a &amp; &lt; &gt; &quot; &#39;'
```

**Newlines get normalized.** `\r\n` in incoming text comes back as `\n`. Correct for HTML, but it changes bytes if you compare hashes or round-trip binary-ish payloads.

**Allocation cost.** The DOM variants build a detached element per call — fine for UI code, too slow for tens of thousands of rows. Reuse one node and clear it between calls, or use the pure-JS version.

**Not byte-for-byte identical to a browser parser.** Some numeric entities are remapped by HTML rules (e.g. `&#0;` yields U+FFFD in a browser, U+0000 in the code above). It only matters for malformed or legacy input.

## Pick what fits the job

- In the browser, with real markup coming in: use the DOM trick — you inherit the whole entity table for free.
- In shared modules, tests, server code: use the portable decoder — runtime-independent and explicit about what it knows.
- Going into an attribute, not between tags: escape quotes yourself (`encodeForAttributes` above), don't rely on `<textarea>`.
- Large or messy data sets: a library, not a hand-written map.
