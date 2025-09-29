# tertiumnon-github-io

Vitalii Balabanov personal web site.

## Zoneless Angular 20 notes

This project is configured to run without Zone.js (zoneless) using `bootstrapApplication`.

- Verify at runtime: the app prints a console message saying whether Zone is present.
- If Zone is detected but you want zoneless behaviour, search for `zone.js` imports and remove them (commonly in `src/polyfills.ts` or 3rd-party libraries). If a dependency requires Zone, either add it to polyfills explicitly or replace the library.
