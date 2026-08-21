---
publishedAt: 2026-07-12
updatedAt: 2026-08-21
category: Programming
tags: ["JavaScript","Tools","Web Development"]
---

# Bun в 2026

![](./img/bun-1.4.png)

> **Для кого эта статья:** для разработчиков JavaScript/TypeScript, которые хотят узнать о главных событиях и новых возможностях Bun в 2026 году.

2026 год стал переломным для Bun. [Переписывание на Rust](https://bun.com/blog/bun-in-rust) с помощью Claude Fable 5 за 11 дней показало новые возможности AI-ускоренной разработки, а 20 августа 2026 [вышел Bun v1.4](https://bun.com/blog/bun-v1.4) — первый production-релиз, полностью работающий на Rust-версии рантайма (до этого Rust использовался только внутри, например в Claude Code). Версия 1.3.14 добавила Bun.Image, HTTP/3 и Global Virtual Store, а v1.4 принесла резкий скачок совместимости с Node.js и десятки новых встроенных API. Bun стал частью Anthropic после [приобретения в декабре 2025](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone).

## Оглавление

- [Основные функции](#основные-функции)
- [Быстрый старт](#быстрый-старт)
- [Главные события 2026](#главные-события-2026)
- [Новые API и фичи](#новые-api-и-фичи)
- [Производительность](#производительность)
- [Итог: какие npm-пакеты больше не нужны](#итог-какие-npm-пакеты-больше-не-нужны)

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

| Возможность | Bun v1.4 | Node.js v24+ |
|-------------|-------------|--------------|
| Запуск .ts файлов | ✅ `bun app.ts` | ✅ `node app.ts` |
| JSX поддержка | ✅ Встроенная | ❌ Нет |
| Path aliases (`@app/*`) | ✅ Из tsconfig.json | ❌ Игнорируются |
| Enums, namespaces | ✅ Работают | ⚠️ Нужен `--experimental-transform-types` |
| Скорость запуска | [~5.1ms на Linux](https://bun.com/blog/bun-v1.4) | ~19ms |
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

### Bun v1.4 (20 августа 2026)

[Bun v1.4](https://bun.com/blog/bun-v1.4) — первый production-релиз на переписанном Rust-движке; раньше Rust-версия жила только внутри Anthropic, в том же Claude Code, а последней Zig-сборкой оставалась v1.3.14. Старт стал быстрее на 50% на Linux (5.1ms против 10.9ms) и в 2.5 раза на Windows (15.5ms против 39.0ms), простой CPU снизился впятеро, а память HTTP-серверов под нагрузкой просела на 35–48%.

Совместимость с Node.js сделала самый большой скачок со времён v1.0: в тест-сьют добавили 1 517 тестов из Node.js, `node:http`, `node:fs`, `node:sqlite` и другие ключевые модули проходят 97–100% из них, а Playwright, Next.js 16, vitest и OpenTelemetry просто заработали. Из нового — Bun.markdown, Bun.Archive, Bun.JSON5/JSONC/XML/TOML: ещё 15 npm-зависимостей заменены нативным кодом. Windows ARM64 получил официальную поддержку.

Показательнее всего цифры из продакшена самого Anthropic: у Claude Code p99 использования CPU упал с 24% до 10%, p50 — с 5.8% до 2.5%.

Часть комьюнити [раскритиковала AI-driven переписывание](https://grigio.org/bun-1-4-the-controversial-ai-driven-rewrite-from-zig-to-rust/) за более чем 13 000 `unsafe`-блоков в итоговом Rust-коде — для сравнения, в написанных вручную Rust-проектах сопоставимого размера их в среднем около 70 — и за то, что крупнейший в истории GitHub PR проверили только AI-агенты (`coderabbitai` и `claude`), без единого человека в ревью. 99,8% пройденного тест-сьюта с первого раза звучит впечатляюще, но это не то же самое, что живой человек, читающий диф на миллион строк — здесь есть за что поволноваться, и это нормально. Апгрейд через `bun upgrade` хотя бы не требует breaking changes.

### Bun v1.3.14 (13 мая 2026)

[Bun v1.3.14](https://bun.com/blog/bun-v1.3.14) — последняя стабильная версия на Zig перед переходом на Rust: принесла Bun.Image (обработка изображений в 7 раз быстрее sharp), HTTP/3 и QUIC в `Bun.serve()` и `fetch()`, Global Virtual Store (установка пакетов из кэша в 7 раз быстрее) и Bun.Terminal — терминальные API на Windows через ConPTY.

### Переписывание на Rust (4-14 мая 2026)

[Bun переписали с Zig на Rust](https://bun.com/blog/bun-in-rust) за 11 дней с помощью Claude Fable 5 — 535 496 строк Zig превратились в больше миллиона строк Rust за 6 502 коммита, до 64 Claude-агентов работали параллельно, а счёт за API вышел на ~$165 000 (5,9 млрд токенов).

Результат: бинарник похудел примерно на 20%, попутно исправили 128 багов, утечки памяти в Bun.build() упали с 6 745 MB до 609 MB — более чем в 11 раз, — и тесты прошли на 100% на всех платформах.

Причина переписывания прозаична: в Zig-версии нашли 13 уязвимостей памяти (use-after-free, double-free, утечки), а Rust ловит такие вещи на уровне компилятора. Прежде чем стать production-версией в v1.4, переписанный код три месяца обкатывался внутри самого Bun, в том числе в Claude Code.

### Приобретение Anthropic (2 декабря 2025)

Bun был [приобретен Anthropic](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone) и теперь используется как основа для Claude Code и Claude Agent SDK. Bun остаётся open source под MIT-лицензией.

## Новые API и фичи

### Bun.Image (v1.3.14, доработан в v1.4)

[Встроенная обработка изображений](https://bun.com/blog/bun-v1.3.14), 7x быстрее альтернатив:

```typescript
import { Image } from "bun";

const img = new Image(await Bun.file("photo.jpg").arrayBuffer());
const resized = await img.resize(800, 600);
const webp = await resized.webp();
```

Поддержка: JPEG, PNG, WebP, GIF, BMP, HEIC, AVIF.

### Bun.WebView (v1.3.12, в v1.4 — системный WebKit или Chrome/Chromium/Edge)

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

### Bun.markdown (v1.4)

[Программный markdown-парсер](https://bun.com/blog/bun-v1.4) — рендер в HTML, React или собственный формат:

```typescript
import { markdown } from "bun";

const html = markdown.toHTML("# Привет, **Bun**!");
const react = markdown.toReact("- один\n- два");
```

### Bun.Archive (v1.4)

[Создание и распаковка архивов](https://bun.com/blog/bun-v1.4) без `tar`/`node-tar`:

```typescript
import { Archive } from "bun";

const archive = new Archive();
await archive.add("dist/", { recursive: true });
await archive.write("release.tar.gz");

await Archive.extract("release.tar.gz", { to: "./out" });
```

### Форматы данных: JSON5, JSONC, XML, TOML (v1.4)

[Встроенные парсеры форматов](https://bun.com/blog/bun-v1.4) — ещё 15 npm-зависимостей стали не нужны:

```typescript
import { JSON5, JSONC, XML, TOML } from "bun";

JSON5.parse("{ unquoted: 'ok', trailing: 1, }");
JSONC.parse("{ /* comment */ \"a\": 1 }");
XML.parse("<root><item>1</item></root>");
TOML.parse("[server]\nport = 8080");
```

### HTTP/3 и QUIC (v1.3.14, теперь и в fetch() — v1.4)

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

В v1.4 экспериментальная поддержка HTTP/2 и HTTP/3 [добавлена и в клиентский `fetch()`](https://bun.com/blog/bun-v1.4):

```typescript
await fetch("https://example.com", { protocol: "http3" });
```

### Параллельное тестирование (v1.3.13, + `--timings` в v1.4)

```bash
bun test --parallel        # параллельное выполнение
bun test --isolate         # изоляция тестов
bun test --shard=1/4       # шардинг для CI
bun test --changed         # только измененные тесты
bun test --timings         # шардинг по реальному времени выполнения (v1.4)
```

### Компиляция в HTML (v1.3.10, + `--asset` в v1.4)

```bash
bun build ./app.ts --compile --target=browser
# Результат: один .html файл

bun build ./app.ts --compile --asset ./data.db
# Встраивает файл в скомпилированный бинарник (v1.4)
```

### Управление пакетами (v1.4)

[Новые команды](https://bun.com/blog/bun-v1.4) для обслуживания зависимостей:

```bash
bun audit fix     # автоматически патчит уязвимости
bun dedupe        # убирает дублирующиеся версии из lockfile
bun prune         # удаляет неиспользуемые пакеты
bun pm diff        # сравнивает версии пакетов
bun pm licenses    # отчёт по лицензиям зависимостей
```

### bun build: React Compiler и barrel-импорты (v1.4)

[Встроенный React Compiler](https://bun.com/blog/bun-v1.4) — в 19 раз быстрее babel-плагина — плюс tree-shaking barrel-файлов, markdown-отчёты о бандле и поддержка стандартных TC39-декораторов:

```bash
bun build ./app.tsx --react-compiler
bun build ./app.ts --metafile-md=report.md
```

### Инструменты разработчика (v1.4)

```bash
bun --cpu-prof-md ./app.ts    # markdown-отчёт профилирования CPU
bun --heap-prof-md ./app.ts   # markdown-отчёт по куче
bun run --parallel "build:*"  # параллельный запуск нескольких скриптов
```

```typescript
process.on("memoryPressure", (level) => {
  console.log("ОС сообщает о нехватке памяти:", level);
});
```

## Производительность

### Сравнение с Node.js и Deno (август 2026, цифры Bun v1.4)

| Метрика | Bun v1.4 | Node.js v26 | Deno v2.5 |
|---------|-------------|-------------|-----------|
| Cold start (Linux) | [~5.1ms](https://bun.com/blog/bun-v1.4) | ~19ms | ~18ms |
| HTTP throughput | 290k req/s | 71k req/s | ~75k req/s |
| Установка пакетов | 4.2s | 38s (npm) | 35s |
| Сборка 50k строк | 1.1s | - | - |

### Bun v1.4 против v1.3: что дал переход на Rust

[По данным Bun](https://bun.com/blog/bun-v1.4), переход Rust-версии в production дал заметный прирост в реальных сценариях:

| Метрика | v1.3 (Zig) | v1.4 (Rust) | Изменение |
|---------|------------|-------------|-----------|
| Старт на Linux | 10.9ms | 5.1ms | −50% |
| Старт на Windows | 39.0ms | 15.5ms | в 2.5 раза быстрее |
| Простой CPU | база | −5x | |
| Размер бинарника (Linux/Windows) | база | −17% | |
| `new URL()` | база | до 4.6x быстрее | |
| Регулярные выражения | база | 138–200x быстрее | |
| FFI-вызовы (`bun:ffi`) | база | 3x быстрее | |

Память HTTP-серверов под нагрузкой на 1M запросов:

| Фреймворк | v1.3 | v1.4 | Снижение |
|-----------|------|------|----------|
| Fastify | 233 MB | 120 MB | −48% |
| Express | 169 MB | 92 MB | −46% |
| `node:http` | 135 MB | 81 MB | −40% |

В продакшене Claude Code, который уже несколько месяцев работал на Rust-версии, p99 использования CPU снизился с 24% до 10%, а p50 — с 5.8% до 2.5%.

### Скорость установки пакетов

| Сценарий | npm v12 | pnpm v11 | bun v1.3 |
|----------|---------|----------|----------|
| Чистая установка | 40s | 15s | **7s** |
| С кэшем | 18s | 5.5s | **2.5s** |
| Монорепо | 110s | 22s | **12s** |

На тестовом Next.js-приложении (T3 stack) [Bun v1.4](https://bun.com/blog/bun-v1.4) устанавливает зависимости ещё быстрее: первая установка — 1.41s (в 15 раз быстрее npm), свежий чекаут с кэшем — 251ms (в 30 раз быстрее), CI без кэша — 951ms (в 19 раз быстрее), CI с кэшем — 210ms (в 21 раз быстрее).

## Когда использовать Bun

Бери не глядя: локальную разработку и CLI-инструменты, новые проекты на TypeScript/JSX, CI/CD (5-8x на установке зависимостей, местами в v1.4 и все 20-30x) и full-stack приложения со встроенным SQL. Windows-разработка тоже сюда — включая ARM64, который теперь официально поддерживается и стартует в v1.4 в 2.5 раза быстрее.

С осторожностью: HTTP/3 в `Bun.serve()` и `fetch()` пока экспериментальный, в прод его тащить рано. Совместимость с нативными N-API-модулями в v1.4 подросла заметно, но процент прохождения тестов — не гарантия для конкретного модуля в конкретном проекте, тестировать всё равно придётся руками. Cold start сократился в разы, что хорошо для serverless, но насколько именно — зависит от платформы, а не только от рантайма. Для приложений с жёсткими лимитами памяти Bun остаётся менее предсказуемым выбором, чем Node.

## Итог: какие npm-пакеты больше не нужны

Идея Bun — не добавить ещё один инструмент в `node_modules`, а убрать из него как можно больше. К v1.4 [Bun заменил нативными реализациями уже 15+ популярных npm-зависимостей](https://bun.com/blog/bun-v1.4) — вместо десятков пакетов в `package.json` можно обойтись одним рантаймом:

| Задача | Типичные npm-пакеты | Нативная замена в Bun | С какой версии |
|--------|----------------------|------------------------|-----------------|
| Обработка изображений | `sharp`, `jimp` | `Bun.Image` | v1.3.14 |
| Headless-браузер | `puppeteer`, `playwright` | `Bun.WebView` | v1.3.12 |
| SQL-клиент | `pg`, `mysql2`, `better-sqlite3` | `Bun.SQL` | v1.3 |
| Cron-задачи | `node-cron`, `cron` | `Bun.cron()` | v1.3.12 |
| Псевдотерминал | `node-pty` | `Bun.Terminal` | v1.3.14 |
| Markdown-рендер | `marked`, `markdown-it`, `remark` | `Bun.markdown` | v1.4 |
| Архивы | `tar`, `node-tar`, `archiver` | `Bun.Archive` | v1.4 |
| JSON5 | `json5` | `Bun.JSON5` | v1.4 |
| JSON с комментариями | `jsonc-parser`, `comment-json` | `Bun.JSONC` | v1.4 |
| XML | `xml2js`, `fast-xml-parser` | `Bun.XML` | v1.4 |
| TOML | `toml`, `@iarna/toml` | `Bun.TOML` | v1.4 |
| Тест-раннер | `jest`, `vitest`, `mocha` | `bun test` | v1.3–1.4 |
| Бандлер | `webpack`, `esbuild`, `rollup`, `parcel` | `bun build` | встроено |
| React Compiler | `babel-plugin-react-compiler` | `bun build --react-compiler` | v1.4 |
| Менеджер пакетов | `npm`, `yarn`, `pnpm` | `bun install` | встроено |
| Проверка лицензий | `license-checker` | `bun pm licenses` | v1.4 |
| Дедупликация зависимостей | ручной `npm dedupe` | `bun dedupe` | v1.4 |
| Поиск неиспользуемых пакетов | `depcheck` | `bun prune` | v1.4 |
| Патчинг уязвимостей | `npm audit` + ручные патчи | `bun audit fix` | v1.4 |
| Автоперезапуск | `nodemon` | `bun --watch` | встроено |
| Параллельные скрипты | `concurrently`, `npm-run-all` | `bun run --parallel` | v1.4 |
| Переменные окружения | `dotenv` | встроенная поддержка `.env` | встроено |
| Запуск TypeScript | `ts-node`, `tsx` | `bun app.ts` | встроено |

Не все замены drop-in — специфичные `webpack`-лоадеры или продвинутые Puppeteer-сценарии никуда не денутся, и сторонний пакет там останется нужен. Но для типового full-stack TypeScript-проекта в 2026 году `package.json` реально можно ужать в разы, оставив `bun` практически единственной зависимостью.

**Ссылки:**
- [Официальный сайт Bun](https://bun.sh)
- [GitHub](https://github.com/oven-sh/bun)
- [Документация](https://bun.com/docs)
- [Bun v1.4 release notes](https://bun.com/blog/bun-v1.4)


**Автор-составитель:** Виталий Балабанов
