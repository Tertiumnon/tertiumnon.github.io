---
publishedAt: 2021-06-22
---

# ExpressJS: Square Brackets in Query

When you send a request with a parameter key containing square brackets (e.g., a JSON API filter like `filter[price]=100`), ExpressJS automatically converts it to a nested object in `req.query`:

```json
{
  "filter": {
    "price": 100
  }
}
```

To disable this automatic transformation and keep the original query string format:

```javascript
server.set('query parser', 'simple');
```
