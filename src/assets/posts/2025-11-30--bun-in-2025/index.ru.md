---
publishedAt: 2025-11-30
updatedAt: 2026-07-17
category: Programming
tags: ["JavaScript","Tools","Web Development"]
---

# Bun в 2025

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **Для кого эта статья:** для разработчиков JavaScript/TypeScript, которые ищут альтернативу Node.js с улучшенной производительностью, встроенными инструментами и упрощенным рабочим процессом.

Bun — это современный JavaScript-рантайм и набор инструментов, объединяющий в себе runtime, менеджер пакетов, бандлер и тестовый раннер. Главная цель Bun — предоставить разработчикам максимально быстрый и простой стек для работы с JavaScript и TypeScript.

В этой статье рассмотрим, что такое Bun, познакомимся с его историей, основными функциями и быстрым стартом.

## Оглавление

- [Что такое Bun?](#что-такое-bun)
- [Основные функции](#основные-функции)
- [Быстрый старт](#быстрый-старт)
- [Главные события 2025 года](#главные-события-2025-года)
- [Известные проблемы и их решения](#известные-проблемы-и-их-решения)

## Что такое Bun?

Bun — это проект, написанный на **Zig** и использующий **JavaScriptCore** (движок JavaScript от WebKit). Он позиционируется как быстрая замена Node.js и Deno, объединяя пакетный менеджер, бандлер, транспилер и тестовый фреймворк в одном бинарном файле.

**Основные преимущества:**

- ⚡ **Скорость** — быстрый старт, меньшее время сборки и высокая пропускная способность для сетевых операций
- 📦 **Единый бинарник** — меньше зависимостей и быстрая установка
- 🛠️ **Инструменты из коробки** — встроенный пакетный менеджер, бандлер и тесты
- 🔄 **Совместимость** — большинство кода для Node.js можно запускать на Bun с минимальными изменениями

### Создатель Bun: Jarred Sumner

<img src="https://avatars.githubusercontent.com/u/709451?v=4" alt="Jarred Sumner" width="150" style="border-radius: 50%;" />

**Jarred Sumner** — основатель и CEO компании Oven.sh, создатель Bun runtime. Выпускник программы Thiel Fellowship (2014).

**Ключевые вехи:**

- **Май 2021** — первые твиты о проекте Bun
- **5 июля 2022** — анонс Bun 0.1
- **Август 2022** — раунд финансирования $7M (Seed) от Kleiner Perkins и Guillermo Rauch (Vercel)
- **Сентябрь 2023** — релиз Bun 1.0
- **2025** — более 5 миллионов загрузок в месяц, используется в Anthropic (Claude Code CLI)

Sumner активно развивает экосистему Bun, добавляя новые возможности: full-stack dev server, SQL API, Redis support и другие инструменты для фулл-стек разработки.

**Контакты:**

- GitHub: [@Jarred-Sumner](https://github.com/Jarred-Sumner)
- X (Twitter): [@jarredsumner](https://x.com/jarredsumner)
- LinkedIn: [Jarred Sumner](https://www.linkedin.com/in/jarred-sumner-a8772425/)

### Язык Zig: фундамент Bun

<img src="https://raw.githubusercontent.com/ziglang/logo/master/zig-mark.svg" alt="Zig Language" width="150" />

**Zig** — современный системный язык программирования, созданный **Andrew Kelley**. Bun написан на Zig благодаря его производительности, безопасности и простоте интеграции с C.

**Почему Zig выбран для Bun:**

- 🚀 **Производительность как у C** — компилируется в нативный код без runtime overhead
- 🔒 **Безопасность памяти** — проверки на compile-time без garbage collector
- 🔄 **Совместимость с C** — прямая интеграция с C-библиотеками (JavaScriptCore, libuv)
- ⚡ **Контроль над памятью** — явное управление без скрытых аллокаций
- 🛠️ **Простота отладки** — отсутствие макросов и скрытого control flow

**Ключевые особенности Zig:**

- **Императивный, статически типизированный** компилируемый язык
- **Нет скрытого control flow** — весь код явный и предсказуемый
- **Compile-time выполнение** — мощная система метапрограммирования
- **Кросс-компиляция из коробки** — поддержка всех популярных платформ
- **Обработка ошибок** — явная через типы ошибок (`!` оператор)

**Создатель Zig: Andrew Kelley**

<img src="https://avatars.githubusercontent.com/u/106511?v=4" alt="Andrew Kelley" width="150" style="border-radius: 50%;" />

Andrew Kelley начал разработку Zig в 2015 году с целью улучшить C, сделав язык проще, безопаснее и мощнее.

**Последние достижения (2025):**

- Миграция проекта с GitHub на Codeberg (ноябрь 2025)
- Улучшение производительности компилятора на 5-50% для x86_64
- Развитие self-hosted компилятора

**Философия Zig:**

> "No hidden control flow. No hidden memory allocations. No preprocessor, no macros."

Это делает Zig идеальным выбором для системного программирования, где важны производительность и предсказуемость.

**Ссылки:**

- [Официальный сайт Zig](https://ziglang.org/)
- [Andrew Kelley на GitHub](https://github.com/andrewrk)
- [Личный сайт Andrew Kelley](https://andrewkelley.me/)

## Основные функции

| Команда | Описание | Альтернатива в Node.js |
|---------|----------|------------------------|
| `bun run` | Выполнение JavaScript/TypeScript файлов | `node` / `ts-node` |
| `bun install` | Быстрый менеджер зависимостей | `npm install` / `yarn` |
| `bun build` | Бандлер и минификатор | `webpack` / `esbuild` |
| `bun test` | Встроенный тест-раннер | `jest` / `vitest` |
| `bun create` | Инициализация проектов из шаблонов | `npm create` |

### TypeScript: встроенная поддержка

Bun **изначально поддерживает** запуск и бандлинг TypeScript файлов без отдельного этапа компиляции — вы можете писать `.ts`/`.tsx` напрямую и запускать через Bun.

**Поддерживаемые возможности:**
- Все стандартные type annotations, interfaces, type aliases
- Enums, decorators, namespaces
- JSX/TSX из коробки
- Path aliases из `tsconfig.json` (`@app/*`, `@utils/*`)
- Sourcemaps

**Важно:** Bun НЕ заменяет статическую проверку типов. Для полноценной проверки типов рекомендуется использовать `tsc --noEmit` в CI.

**Сравнение с Node.js:** В 2024-2025 годах Node.js также начал поддерживать TypeScript. [Node.js v22.6 (август 2024)](https://nodejs.org/learn/typescript/run-natively) добавил флаг `--experimental-strip-types`, а [Node.js v23 (октябрь 2024)](https://nodejs.org/api/typescript.html) включил его по умолчанию. Однако Node.js использует "type stripping" — удаление типов без полноценной трансформации. Bun поддерживает больше возможностей: JSX, path aliases, enums, namespaces работают из коробки.

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

#### Режим watch (автоматическая пересборка)

```bash
# Собрать и наблюдать за изменениями
bun build --watch --target=node --outfile=dist/server.js src/server.ts

# Отключить очистку экрана между пересборками
bun build --watch --no-clear-screen --target=node --outfile=dist/server.js src/server.ts
```

**Полезные флаги:**

- `--watch` — включить режим наблюдения
- `--no-clear-screen` — не очищать консоль между пересборками
- `--outfile` / `--outdir` — путь к результату сборки
- `--target` — целевая платформа: `node`, `bun` или `browser`
- `--react-fast-refresh` — быстрая перезагрузка для React

### Запуск тестов

Bun включает встроенный тест-раннер, совместимый с Jest API:

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

Запуск тестов:

```bash
# Однократный запуск
bun test

# Режим watch (перезапуск при изменениях)
bun test --watch
```

Ожидаемый вывод:

```text
 RUNS  tests/example.test.ts
 PASS  tests/example.test.ts (5 ms)
 ✓ 1 test passed
```

## Главные события 2025 года

### Приобретение Anthropic (декабрь 2, 2025)

**Историческое событие:** Bun был приобретен **Anthropic** — компанией создавшей Claude!

**Значение:**
- Bun теперь официально часть инфраструктуры Anthropic
- Используется как основа для **Claude Code** и **Claude Agent SDK**
- Долгосрочная поддержка и развитие гарантированы

### Основные фичи 2025

**Full-Stack разработка (октябрь 2025):**
- Zero-config фронтенд разработка
- Встроенный SQL API (DatabaseFirst подход)
- Встроенный Redis клиент
- Улучшенная безопасность

**API и инструменты:**
- **Bun.Archive API** — создание и распаковка tarballs (v1.3.6)
- **Bun.Terminal API** — работа с терминалом (v1.3.5)
- **URLPattern API** — обработка URL паттернов (v1.3.4)
- **CompressionStream/DecompressionStream** — встроенное сжатие (v1.3.3)

**Поддержка форматов:**
- JSON5 (с комментариями)
- JSONL (JSON Lines)
- JSONC (JSON with Comments)

**Производительность 2025:**
- 50% быстрее `Buffer.from(array)`
- 35% быстрее async/await
- 3x быстрее `array.flat()`
- 2x быстрее `bun build` на macOS

**Тестирование:**
- Fake Timers для bun:test
- Опции `retry` и `repeats`
- `onTestFinished` hook
- VS Code интеграция

**Облачные платформы:**
- Vercel добавила нативную поддержку Bun Runtime (октябрь 2025)

**Стандарты:**
- Async stack traces
- TC39 compliance improvements

## Известные проблемы и их решения

Bun прошел долгий путь от экспериментального рантайма до production-ready инструмента. В этом разделе собраны основные проблемы совместимости, которые были исправлены, а также текущие ограничения.

### Поддержка Windows

**Проблема:** До версии 1.1 Bun был доступен только на Linux и macOS.

**Решение:** [Bun 1.1 (апрель 2024)](https://bun.com/blog/bun-v1.1) добавил полноценную поддержку Windows 10 и 11. Реализован специальный формат `.bunx` для обхода ограничений Windows с shebang-скриптами. `bun install` работает в 18 раз быстрее yarn и в 30 раз быстрее npm на Windows.

**Текущий статус:** Полная поддержка. В [версии 1.1.3](https://bun.sh/blog/bun-v1.1.3) `bun install` стал на 50% быстрее на Windows. В версии 1.1.2 переписан `fs.watch` для Windows с улучшенной производительностью и надежностью.

### Совместимость с Node.js API

**Проблема:** Ранние версии Bun поддерживали ограниченный набор Node.js модулей, что приводило к несовместимости с популярными npm-пакетами.

**Решение:** Команда Bun начала систематически запускать тестовый набор Node.js для каждого изменения кода. [Bun 1.2 (январь 2025)](https://bun.com/blog/bun-v1.2) исправил тысячи багов совместимости с Node.js:

- **node:http2** — добавлена поддержка HTTP/2 серверов (ранее работал только клиент), что позволяет создавать gRPC-серверы
- **node:dgram** — реализация UDP-сокетов для пакетов типа DataDog `dd-trace` и ClickHouse
- **node:cluster** — поддержка многопоточных HTTP-серверов на нескольких CPU
- **node:zlib** — полностью переписан с JavaScript на нативный код, добавлена поддержка Brotli
- **V8 C++ API** — беспрецедентная реализация публичного C++ API V8 в JavaScriptCore, что позволило запускать пакеты типа `cpu-features` без модификации

[Bun 1.3 (октябрь 2025)](https://bun.com/blog/bun-v1.3) добавил еще 800+ тестов из тестового набора Node.js и реализовал поддержку `vm.SourceTextModule`, `vm.SyntheticModule` и `node:test`.

**Текущий статус:** Более 90% тестов Node.js для основных модулей проходят успешно.

### Проблемы с HTTP-фреймворками

**Проблема:** Express и Fastify работали медленнее или с ошибками из-за неполной реализации `node:http`.

**Решение:** [Bun 1.2](https://bun.com/blog/bun-v1.2) оптимизировал `node:http`, что сделало Express в 3 раза быстрее, чем на Node.js. В [Bun 1.2.6 (март 2025)](https://bun.sh/blog/bun-v1.2.6.md) Express стал на 9% быстрее, Fastify — на 5.4%.

**Текущий статус:** Express, Fastify и Hono работают без модификаций. Hono на Bun показывает до 180K запросов в секунду.

### Async Stack Traces

**Проблема:** Stack traces в Bun не показывали асинхронные вызовы, что затрудняло отладку async/await кода.

**Решение:** [Bun 1.3](https://bun.com/blog/bun-v1.3) добавил async stack traces — теперь стек вызовов включает полную цепочку асинхронных операций. В [версии 1.2.22 (сентябрь 2025)](https://bun.com/blog/bun-v1.2.22) исправлены баги с обрезкой stack traces.

**Текущий статус:** Полноценная поддержка async stack traces для отладки.

### Поддержка Angular

**Проблема:** В начале 2025 года Angular CLI имел проблемы совместимости с Bun: сборка занимала слишком много времени, были ошибки с определением версии Node.js runtime.

**Решение:** Улучшения в [Bun 1.2](https://bun.com/blog/bun-v1.2) (node:http, node:vm) и [Bun 1.3](https://bun.com/blog/bun-v1.3) (vm.SourceTextModule, совместимость с Node.js) исправили большинство проблем. Во второй половине 2025 года Angular приложения стали работать с Bun стабильно.

**Текущий статус:** Работает. Хотя [запрос на официальную поддержку](https://github.com/angular/angular-cli/issues/24490) в Angular CLI был закрыт, на практике `bun install` и `bun run` работают с Angular проектами.

### Next.js и другие фреймворки

**Проблема:** Ранние версии Bun имели проблемы с Next.js dev server и некоторыми функциями.

**Решение:** [Bun 1.3](https://bun.com/blog/bun-v1.3) исправил краши Next.js dev server, проблемы с разрешением CJS/ESM модулей и циклическими зависимостями. [Vercel добавил нативную поддержку Bun Runtime (октябрь 2025)](https://bun.com/blog/vercel-adds-native-bun-support).

**Текущий статус:** Next.js работает с Bun. Astro, SvelteKit, Remix и Nuxt интегрировали Bun-специфичные оптимизации.

### Native-модули (node-gyp, N-API)

**Проблема:** Пакеты с нативными C/C++ расширениями (node-gyp) не работали, так как они компилируются под V8, а Bun использует JavaScriptCore.

**Текущий статус:** Bun [реализовал Node-API](https://bun.com/docs/runtime/nodejs-compat), что позволяет запускать многие нативные модули без перекомпиляции. Популярные пакеты типа `better-sqlite3` работают, хотя рекомендуется использовать встроенный `bun:sqlite`.

**Остающиеся ограничения:**
- `bcrypt` — рекомендуется использовать `bcryptjs` или `Bun.password`
- `canvas` — нет полноценного workaround
- `argon2` — нет нативной поддержки
- Пакеты с `binding.gyp` файлами могут не работать

### Prisma и ORM

**Проблема:** Prisma использовал Rust-based query engine, который имел проблемы совместимости с Bun и edge-рантаймами.

**Решение:** Prisma 7 (ноябрь 2025) заменил Rust-движок на TypeScript/WASM query compiler. [Prisma v7.2.0 (декабрь 2025)](https://www.bytebase.com/blog/drizzle-vs-prisma/) добавил Bun-aware инициализацию.

**Текущий статус:** Prisma полностью совместим с Bun начиная с v5.4 (generated client — чистый JavaScript). Drizzle ORM работает с Bun изначально.

### Резюме по совместимости

| Область | Статус | Версия исправления |
|---------|--------|-------------------|
| Windows | Полная поддержка | Bun 1.1 (апрель 2024) |
| Node.js API (90%+) | Работает | Bun 1.2 (январь 2025) |
| Express/Fastify/Hono | Работает | Bun 1.2+ |
| Next.js | Работает | Bun 1.3 |
| Async Stack Traces | Работает | Bun 1.3 |
| Angular | Работает | Bun 1.2/1.3 (H2 2025) |
| Native модули | Частично | Зависит от пакета |

**Автор-составитель:** Виталий Балабанов
