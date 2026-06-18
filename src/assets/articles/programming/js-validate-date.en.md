---
publishedAt: 2019-02-01
---

# JS: How to Validate Date

Check whether a date string is valid using the `Date` constructor:

```javascript
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

isValidDate('2019-01-31'); // true
isValidDate('not-a-date'); // false
```

For stricter validation (e.g., ensuring the format is exactly `YYYY-MM-DD`), combine with a regex check:

```javascript
function isValidDateStrict(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
```
