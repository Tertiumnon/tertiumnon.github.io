---
publishedAt: 2026-07-12
updatedAt: 2026-07-17
category: Programming
tags: ["JavaScript","Tools","Web Development"]
---

# Bun в 2026

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **Для кого эта статья:** для разработчиков JavaScript/TypeScript, которые хотят узнать о главных событиях и новых возможностях Bun в 2026 году.

2026 год стал переломным для Bun. [Переписывание на Rust](https://bun.com/blog/bun-in-rust) с помощью Claude Fable 5 за 11 дней показало новые возможности AI-ускоренной разработки. Версия 1.3.14 добавила Bun.Image, HTTP/3 и Global Virtual Store. Bun стал частью Anthropic после [приобретения в декабре 2025](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone).

## Оглавление

- [Основные функции](#основные-функции)
- [Быстрый старт](#быстрый-старт)
- [Главные события 2026](#главные-события-2026)
- [Новые API и фичи](#новые-api-и-фичи)
- [Производительность](#производительность)

## Основные функции

| Команда | Описание | Альтернатива в Node.js |
|---------|----------|------------------------|
| `bun run` | Выполнение JavaScript/TypeScript файлов | `node` / `ts-node` |
| `bun install` | Быстрый менеджер зависимостей | `npm install` / `yarn` |
| `bun build` | Бандлер и минификатор | `webpack` / `esbuild` |
| `bun test` | Встроенный тест-раннер | `jest` / `vitest` |
| `bun create` | Инициализация проектов из шаблонов | `npm create` |
| `Bun.serve()` | HTTP/HTTP2/HTTP3 сервер | `express` / `fastify` |
| `Bun.SQL` | Встроенный SQL-клиент | `pg` / `mysql2` |

### TypeScript: встроенная поддержка

Bun изначально поддерживает запуск TypeScript и JSX без отдельного этапа компиляции. Path aliases из `tsconfig.json` работают из коробки.

**Важно:** Bun НЕ заменяет статическую проверку типов. Для полноценной проверки используйте `tsc --noEmit` в CI.

### Bun vs Node.js: поддержка TypeScript в 2026

[Node.js v24](https://nodejs.org/api/typescript.html) (LTS 2026) сделал type stripping поведением по умолчанию. Однако между Bun и Node.js остаются важные различия:

| Возможность | Bun v1.3.14 | Node.js v24+ |
|-------------|-------------|--------------|
| Запуск .ts файлов | ✅ `bun app.ts` | ✅ `node app.ts` |
| JSX поддержка | ✅ Встроенная | ❌ Нет |
| Path aliases (`@app/*`) | ✅ Из tsconfig.json | ❌ Игнорируются |
| Enums, namespaces | ✅ Работают | ⚠️ Нужен `--experimental-transform-types` |
| Скорость запуска | ~2ms | ~19ms |
| Встроенный бандлер | ✅ `bun build` | ❌ Нет |

**Когда выбрать Bun:** JSX/React проекты, использование path aliases, максимальная скорость разработки.

**Когда достаточно Node.js:** простые .ts скрипты без JSX и path aliases.

## Быстрый старт

### Установка зависимостей

```bash
bun install
```

### Запуск скрипта

```bash
bun run start
# или напрямую
bun index.ts
```

### Сборка проекта

```bash
bun build index.ts --target node --outfile dist/bundle.js
```

### Запуск тестов

```ts
// tests/example.test.ts
import { describe, it, expect } from "bun:test";

describe("sum", () => {
  it("должен корректно складывать числа", () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(1, 2)).toBe(3);
  });
});
```

```bash
bun test
bun test --watch
bun test --parallel  # новое в 2026
```

## Главные события 2026

### Bun v1.3.14 (13 мая 2026)

[Релиз Bun v1.3.14](https://bun.com/blog/bun-v1.3.14) — последняя стабильная версия:

- **Bun.Image** — встроенная обработка изображений (7x быстрее sharp)
- **HTTP/3 и QUIC** — поддержка в `Bun.serve()` и `fetch()`
- **Global Virtual Store** — 7x быстрее установка пакетов с кэшем
- **Bun.Terminal** — терминальные API на Windows через ConPTY

### Переписывание на Rust (4-14 мая 2026)

[Bun был переписан с Zig на Rust](https://bun.com/blog/bun-in-rust) за 11 дней с помощью Claude Fable 5:

**Масштаб:**
- 535,496 строк Zig-кода → 1+ млн строк Rust-кода
- 6,502 коммита
- ~$165,000 затрат на API (5.9 млрд токенов)
- До 64 Claude-агентов работали параллельно

**Результаты:**
- Бинарник на ~20% меньше
- 128 багов исправлено
- Утечки памяти в 11 раз меньше (Bun.build(): 6,745 MB -> 609 MB)
- 100% тестов прошло на всех платформах

**Причина:** 13 уязвимостей памяти в Zig-версии (use-after-free, double-free, утечки). Rust гарантирует безопасность на уровне компилятора.

### Приобретение Anthropic (2 декабря 2025)

Bun был [приобретен Anthropic](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone) и теперь используется как основа для Claude Code и Claude Agent SDK. Bun остаётся open source под MIT-лицензией.

## Новые API и фичи

### Bun.Image (v1.3.14)

[Встроенная обработка изображений](https://bun.com/blog/bun-v1.3.14), 7x быстрее альтернатив:

```typescript
import { Image } from "bun";

const img = new Image(await Bun.file("photo.jpg").arrayBuffer());
const resized = await img.resize(800, 600);
const webp = await resized.webp();
```

Поддержка: JPEG, PNG, WebP, GIF, BMP, HEIC, AVIF.

### Bun.WebView (v1.3.12)

[Headless браузер](https://bun.com/docs/runtime/webview) без Puppeteer и Playwright:

```typescript
const webview = await Bun.WebView.open("https://example.com");
const screenshot = await webview.screenshot();
await webview.close();
```

### Bun.cron (v1.3.12)

[Встроенный планировщик задач](https://bun.com/blog/bun-v1.3.12):

```typescript
import { cron } from "bun";

cron("0 * * * *", () => {
  console.log("Каждый час");
});
```

### Bun.SQL (v1.3)

Встроенный SQL-клиент без внешних зависимостей:

```typescript
import { sql } from "bun";

const users = await sql`SELECT * FROM users WHERE id = ${userId}`;
```

Поддержка: PostgreSQL, MySQL, MariaDB, SQLite.

### Markdown в терминале (v1.3.12)

```bash
bun ./README.md  # рендерит markdown в терминале
```

### HTTP/3 и QUIC (v1.3.14)

```typescript
Bun.serve({
  port: 443,
  tls: { /* ... */ },
  // HTTP/3 включается автоматически с TLS
  fetch(req) {
    return new Response("Hello HTTP/3!");
  },
});
```

### Параллельное тестирование (v1.3.13)

```bash
bun test --parallel        # параллельное выполнение
bun test --isolate         # изоляция тестов
bun test --shard=1/4       # шардинг для CI
bun test --changed         # только измененные тесты
```

### Компиляция в HTML (v1.3.10)

```bash
bun build ./app.ts --compile --target=browser
# Результат: один .html файл
```

## Производительность

### Сравнение с Node.js и Deno (июль 2026)

| Метрика | Bun v1.3.14 | Node.js v26 | Deno v2.5 |
|---------|-------------|-------------|-----------|
| Cold start | ~2ms | ~19ms | ~18ms |
| HTTP throughput | 290k req/s | 71k req/s | ~75k req/s |
| Установка пакетов | 4.2s | 38s (npm) | 35s |
| Сборка 50k строк | 1.1s | - | - |

### Скорость установки пакетов

| Сценарий | npm v12 | pnpm v11 | bun v1.3 |
|----------|---------|----------|----------|
| Чистая установка | 40s | 15s | **7s** |
| С кэшем | 18s | 5.5s | **2.5s** |
| Монорепо | 110s | 22s | **12s** |

## Когда использовать Bun

**Рекомендуется:**
- Локальная разработка и CLI-инструменты
- Новые проекты с TypeScript/JSX
- CI/CD (ускорение установки в 5-8 раз)
- Full-stack приложения со встроенным SQL

**С осторожностью:**
- Production с большим количеством нативных модулей
- Serverless без warm-up (cold start может быть медленнее)
- Приложения с жесткими ограничениями памяти

**Ссылки:**
- [Официальный сайт Bun](https://bun.sh)
- [GitHub](https://github.com/oven-sh/bun)
- [Документация](https://bun.com/docs)


**Автор-составитель:** Виталий Балабанов
