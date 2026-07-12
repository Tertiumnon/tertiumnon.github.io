---
publishedAt: 2025-11-30
updatedAt: 2025-11-30
category: Programming
tags: ["JavaScript","Tools","Web Development"]
---

# Bun в 2025 — что это и как начать

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **Для кого эта статья:** для разработчиков JavaScript/TypeScript, которые ищут альтернативу Node.js с улучшенной производительностью, встроенными инструментами и упрощенным рабочим процессом.

Bun — это современный JavaScript-рантайм и набор инструментов, объединяющий в себе runtime, менеджер пакетов, бандлер и тестовый раннер. Главная цель Bun — предоставить разработчикам максимально быстрый и простой стек для работы с JavaScript и TypeScript.

В этой статье рассмотрим, что такое Bun, познакомимся с его историей, основными функциями и быстрым стартом.

**Для полного анализа производительности и рекомендаций по использованию Bun в production, см. статью "[Bun в 2026](../2026-07-12--bun-2026/)".**

## Оглавление

- [Что такое Bun?](#что-такое-bun)
- [Основные функции](#основные-функции)
- [Быстрый старт](#быстрый-старт)

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

**Важно:** Bun НЕ заменяет статическую проверку типов. Для полноценной проверки типов рекомендуется использовать `tsc --noEmit` в CI. Bun предоставляет быстрый транспилятор/бандлер с поддержкой большинства синтаксических возможностей TypeScript и встроенными sourcemaps.

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

---

**Автор-составитель:** Виталий Балабанов
