---
publishedAt: 2026-07-12
updatedAt: 2026-07-12
category: Programming
tags: ["Review","JavaScript","Tools","Web Development","Performance"]
---

# Bun в 2026 — производительность, рекомендации и облачные платформы

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **Для кого эта статья:** для разработчиков, которые рассматривают Bun для production-использования и хотят понять метрики производительности, когда его использовать и как его деплоить на облачных платформах.

После успешного запуска в 2025 году Bun продолжает расти и улучшаться. Текущая версия v1.3.14 включает значительные улучшения производительности и новые API. В мае 2026 года произошло значимое событие — Bun был полностью переписан на Rust с использованием Claude Fable 5, выпустив v1.4.0 с 128 исправленными багами. В этой статье разберемся с реальными метриками производительности, деталями переписывания на Rust, сравнениями с Node.js и Deno, а также практическими рекомендациями для production-среды.

**Для введения и основных функций Bun, см. статью "[Bun в 2025](../2025-11-30--bun-2025/)".**

---

## Переписывание на Rust: как это осуществляется (май 2026)

### Почему Rust?

Bun v1.3.14 (написана на Zig) имела **13 серьезных уязвимостей** безопасности памяти:

**Use-after-free crashes:**
- `node:zlib` — утечка в компрессии
- `node:http2` — обработка фреймов
- `UDPSocket` — асинхронное закрытие

**Double-free errors:**
- CSS парсер с vendor prefixes

**Memory leaks:**
- `crypto.scrypt()` — вычисление ключей
- `fs.watch()` — наблюдение файлов

**Race conditions:**
- `MessageEvent` — асинхронные события

**Корневая проблема:** "Смешивание garbage-collected значений с manually-managed памятью" в Zig требовало педантичного контроля на каждом call site. Rust гарантирует это на уровне компилятора.

### Масштаб проекта (4-14 май 2026)

**Объем работ:**
- **535,496 строк кода** переписано
- **1,448 .zig файлов** → .rs файлы
- **~100 крейтов** (пакетов) для ускорения компиляции

**Результат:**
- **6,502 коммита** за 11 дней
- **695 коммитов/час** пиковая нагрузка
- **1,300 строк кода/минуту** в среднем

### Революционный метод: AI-ускоренный порт

**Используемые технологии:**
- **Claude Fable 5** — передовая модель Anthropic
- **Claude Code** — с динамическими рабочими процессами
- **До 64 Claude-агентов** работали параллельно
- **5.9 млрд входных токенов** обработано
- **~$165,000** затрат на API

**Этапы (11 дней):**

1. **Подготовка (~3 часа):**
   - `PORTING.md` — руководство по порту (паттерны Zig→Rust)
   - `LIFETIMES.tsv` — отображение времен жизни переменных

2. **Пробный запуск:**
   - Тестирование на 3 файлах с двойной проверкой
   - Валидация методологии

3. **Параллельный перенос:**
   - 1,448 файлов одновременно
   - 64 агента Claude работают независимо

4. **Исправление ошибок компилятора:**
   - ~16,000 ошибок разделены между агентами
   - Группировка по модулям (крейтам)

5. **Полное тестирование:**
   - Локальное тестирование на всех 6 платформах
   - CI проверки всех комбинаций

### Ключевая инновация: Adversarial Review

**Система контроля качества:**

```
1 Implementer (видит весь контекст)
         ↓
    [Пишет код]
         ↓
2 Adversarial Reviewers (видят только diff)
  - Инструкция: "Предположи, что неправильно"
  - Независимые проверки друг от друга
         ↓
    [Отчеты об ошибках]
         ↓
1 Fixer (применяет исправления)
```

**Примеры пойманных багов:**
- `Box::leak` vs двойной free в `uv_close()` (асинхронное закрытие libuv)
- `unwrap_or()` vs `unwrap_or_else()` с lazy evaluation в `color-mix()`
- `trunc()` vs `floor()` для отрицательных времен (nsec должен быть в `[0, 1e9)`)

### Регрессии: 19 найденных и исправленных

**1. Side effects в debug_assert:**
```zig
// Zig: assert = функция (выполняется всегда)
assert(value > 0 && increment());  // increment() вызывается всегда

// Rust: debug_assert! = макрос (стирается в release)
debug_assert!(value > 0 && increment());  // НЕ вызывается в release
```
**Результат:** Нарушение HMR для React при release сборке.

**2. Нечетные срезы UTF-16:**
- Обработка BOM с нечетным числом байтов
- Zig игнорировал, `bytemuck` в Rust паникует

**3. Bounds checks:**
- Linux компилировал ReleaseFast без проверок
- Rust оставляет их по умолчанию
- Modulo resolver переполнение: 8.4M → 270K filenames

**4. Comptime format strings:**
- OSC 8 hyperlinks обрезались backslash в терминале

### Результаты в Rust v1.4.0

**Производительность:**
- HTTP throughput: **+2.8-4.8%** быстрее
- Размер бинарника: **~20% меньше**
- Startup Claude Code: **10% быстрее**

**Управление памятью — главный успех:**
- Drop trait автоматизировал cleanup (vs `defer` в Zig)
- Исправлены утечки в error paths

**Конкретный пример утечки:**
```
Bun.build() утечка памяти (v1.3.14):
  2000 вызовов → 6,745 MB памяти
  
После Rust (v1.4.0):
  2000 вызовов → 609 MB памяти
  
Улучшение: в 11 раз меньше! 🎯
```

**LeakSanitizer findings:**
- Инструментирование всех native allocations
- Идентификация утечек в скрытых error paths

**Управление unsafe кодом:**
- **4% unsafe кода** (~13,000 unsafe keywords на ~780,000 строк)
- 78% unsafe блоков — однострочные (C/C++ pointers и syscalls)
- Остальное — критичный код с явным контролем

### Неожиданные открытия

**Cross-language LTO (Link-Time Optimization):**
- Rust-C/C++ комбинация позволяет LLVM inlining через языковые границы
- Больше возможностей для оптимизации чем в чистом Zig

**LLVM lifetime intrinsics:**
- Автоматическое переиспользование stack slots в рекурсивных парсерах
- Решило проблему глубокой вложенности TOML (глубина > 100 уровней)

**Инфраструктурные вызовы:**
- IOPS лимиты EC2 вызвали "freeze" при параллельной компиляции
- Медленная grep команда заморозила все на минуты
- Disk crashed несколько раз из-за интенсивной записи
- Git конфликты когда агенты "наступали друг другу на ноги"

### Текущее состояние и использование

**Bun v1.4.0** — первая версия на Rust:
- Все 100% тестов прошли на всех 6 платформах
- 128 багов исправлено по сравнению с v1.3.14
- **24/7 coverage-guided fuzzing** — 100 млрд executions, ~15 новых PR найдено

**Текущие пользователи:**
- ✅ **Prisma Compute** (публичный бета)
- ✅ **Claude Code v2.1.181+** (используется как runtime)

✅ **На июль 2026:**
- **Bun v1.3.14** — стабильная версия на Zig (до переписывания)
- **Bun v1.4.0** — выпущена на Rust (май 2026), в production использовании
  - Prisma Compute: публичный бета
  - Claude Code v2.1.181+: основной runtime
- **Рекомендация:** Переходите на v1.4.0 для production если вы на стабильной версии

---

## Новые фичи Bun в 2026 году

### Markdown рендеринг в терминале (v1.3.12, апрель 2026)

**Инновация:** Bun может рендерить Markdown файлы прямо в терминале!

```bash
# Просмотр markdown файла в терминале
bun ./README.md

# Работает с любыми .md файлами
bun ./docs/guide.md
```

Файлы красиво форматируются в терминале с поддержкой синтаксиса, таблиц, кодовых блоков.

### Встроенный Image API (v1.3.14, май 2026)

**Bun.Image** — встроенная обработка изображений, **7x быстрее** чем альтернативы:

```typescript
import { Image } from "bun";

const img = new Image(/* ... */);
const resized = await img.resize(800, 600);
const webp = await resized.webp();
```

Поддержка форматов: JPEG, PNG, WebP, GIF, и других.

### Bun.WebView — Headless браузер (v1.3.12)

**Автоматизация браузера** встроенная в Bun:

```typescript
const webview = await Bun.WebView.open("https://example.com");
const screenshot = await webview.screenshot();
await webview.close();
```

Используется для: тестирования, скрейпинга, автоматизации.

### Встроенный Scheduler Bun.cron() (v1.3.11-12)

**Cron jobs** без внешних зависимостей:

```typescript
import { cron } from "bun";

// Каждый час
cron("0 * * * *", () => {
  console.log("Hourly task");
});

// Поддерживает стандартные cron выражения
// и читаемый синтаксис
```

### Параллельное выполнение тестов (v1.3.13, апрель 2026)

**Ускорение тестирования** через параллелизм:

```bash
# Параллельное выполнение
bun test --parallel

# С изоляцией каждого теста
bun test --isolate

# Sharding тестов на несколько воркеров
bun test --shard=1/4

# Только измененные тесты
bun test --changed
```

Результат: **значительное ускорение** тестирования на CI/CD.

### Оптимизации памяти и производительности

**v1.3.13 (апрель):**
- 17x меньше памяти при установке пакетов
- 8x меньше памяти для source maps
- 5.5x быстрее gzip compression (zlib-ng)

**v1.3.12 (апрель):**
- 2.3x быстрее URLPattern
- 2x быстрее Bun.Glob.scan

**v1.3.11 (март):**
- 4 MB меньше размер на Linux

**v1.3.10 (февраль):**
- Нативный REPL
- Более быстрый event loop

### Компиляция в самостоятельный HTML (v1.3.10)

**Превращение TypeScript в HTML:**

```bash
bun build ./app.ts --compile --target=browser
```

Результат: один самостоятельный `.html` файл, готовый к запуску.

### Другие значительные добавления

- **Windows ARM64 поддержка** (v1.3.10) — Bun теперь работает на ARM машинах Windows
- **TC39 ES Decorators** (v1.3.10) — стандартные декораторы
- **Bun.sliceAnsi** (v1.3.11) — работа с ANSI строками
- **Улучшенный Bun.markdown** (v1.3.11) — лучше парсинг и обработка

---

## Оглавление

- [Переписывание на Rust: как это осуществляется](#переписывание-на-rust-как-это-осуществляется-май-2026)
- [Метрики производительности](#метрики-производительности)
- [Bun vs Deno](#bun-vs-deno-ключевые-различия)
- [Сравнение безопасности](#-сравнение-безопасности-nodejs-vs-deno-vs-bun)
- [TypeScript в 2026: Bun vs Node.js](#typescript-в-2026-bun-vs-nodejs)
- [Когда стоит использовать Bun](#когда-стоит-использовать-bun)
- [Ограничения и моменты внимания](#ограничения-и-моменты-внимания)
- [Работа с многопоточностью](#работа-с-многопоточностью-в-bun)
- [Процесс менеджеры](#запуск-bun-как-daemon-процесс-менеджеры)
- [CI/CD: GitHub Actions](#bun-в-cicd-github-actions)
- [Облачные провайдеры](#нюансы-использования-с-популярными-облачными-провайдерами)
- [Ссылки и ресурсы](#ссылки-на-источники-и-дополнительные-материалы)

## Метрики производительности

> **⚠️ Важно:** Результаты микро-бенчмарков не всегда переносятся на реальные приложения. В production-сценариях разница в производительности часто незначительна или даже противоположна заявленной в синтетических тестах.

Данные получены из простых HTTP-сервера тестов ("Hello World") и агрегированы из независимых бенчмарков 2025 года. Результаты могут значительно отличаться в реальных приложениях с базами данных, сложной бизнес-логикой и зависимостями.

---

**Тестовые версии (Июль 2026):**

- Node.js v26.x (Current, released April 2026) + npm v12.1.0
- Node.js v24.x (Active LTS, released April 2024) + npm v11.8.0
- Node.js v22.x (Maintenance LTS) + npm v10.9.0
- Deno v2.5.0 (June 2026)
- Bun v1.3.14 (July 2026)

### Cold Start (время запуска, мс)

_Цвета (слева направо):_ **оранжевый** — Node 20; **жёлтый** — Node 22; **красный** — Node 24; **зелёный** — Deno; **синий** — Bun.

![Cold Start: Bun vs Node/Deno](../2025-11-30--bun-2025/img/bun-cold-start-comparison.svg)

**Результаты (2026):**

- **Bun v1.3.14:** ~1.8 ms — самый быстрый запуск
- **Deno v2.5:** ~18 ms — значительное улучшение
- **Node.js v26 + npm v12:** ~19 ms (улучшение)
- **Node.js v24 + npm v11:** ~21 ms
- **Node.js v22 + npm v10:** ~22 ms

**⚠️ Важное уточнение:** Показанные результаты (2ms для Bun) относятся к микро-бенчмаркам локального запуска. В **serverless-окружениях** (AWS Lambda, CloudFlare Workers) Bun может показывать **значительно худшие** результаты из-за необходимости загрузки нестандартного runtime. В production-кейсах cold start с Bun может увеличиться в 2-3 раза.

### Throughput (пропускная способность, req/s)

![Throughput: Bun vs Node/Deno](../2025-11-30--bun-2025/img/bun-throughput-comparison.svg)

**Результаты (2026):**

- **Deno v2.5:** ~75k req/s — впечатляющая производительность, лидирует
- **Bun v1.3.14:** ~62k req/s — значительный прирост, в 4.5× быстрее Node.js v22
- **Node.js v26 + npm v12:** ~18k req/s — улучшения в WebStreams и Fetch API
- **Node.js v24 + npm v11:** ~16.5k req/s
- **Node.js v22 + npm v10:** ~15k req/s

**Примечание:** Результаты для простого HTTP-сервера без обращений к базе данных. В реальных приложениях с комплексной логикой разница часто сглаживается.

### Memory Usage (MB)

![Memory: Bun vs Node/Deno](../2025-11-30--bun-2025/img/bun-memory-comparison.svg)

**⚠️ Важно: Память — наиболее противоречивая метрика (2025):**

Отчеты о потреблении памяти Bun существенно различаются между синтетическими бенчмарками и production-кейсами:

**Синтетические бенчмарки (микро):**

- **Bun v1.3.14:** ~42-48 MB на простом HTTP-сервере
- **Deno v2.5:** ~50-55 MB
- **Node.js v22/v24/v26 + npm:** ~48-60 MB
- Разница: **близкая или Bun немного лучше**

**Production-сценарии (реальные приложения, июль 2026):**

- **Bun:** **Часто использует +25-35% больше памяти** (улучшилось с 2025)
- **Deno:** Лучше Node.js, немного хуже Bun в микро-тестах
- **Node.js:** Стабильное потребление, лучше масштабируется

**Причины различий:**

1. **JavaScriptCore оптимизирует для скорости** — требует больше памяти для JIT-оптимизаций
2. **Зависимости и реальный код** — с большим количеством пакетов Bun может потребовать значительно больше памяти
3. **Долгоживущие процессы** — V8 лучше справляется с garbage collection в долгосрочных приложениях
4. **Микро-бенчмарки вводят в заблуждение** — простой HTTP-сервер не репрезентативен для реальных приложений

**Рекомендация:** Если ваше приложение чувствительно к потреблению памяти (edge computing, serverless, микроуслуги), проведите собственное тестирование с вашим реальным кодом перед миграцией на Bun.

### CPU Usage (% загрузки процессора)

![CPU Usage: Bun vs Node/Deno](../2025-11-30--bun-2025/img/bun-cpu-comparison.svg)

**Результаты под нагрузкой (HTTP-запросы, июль 2026):**

- **Node.js v22/v24/v26 + npm:** ~42-46% CPU — стабильное потребление
- **Deno v2.5:** ~38% CPU — эффективная работа с нагрузкой, улучшения
- **Bun v1.3.14:** ~34% CPU — лучшая эффективность благодаря JavaScriptCore

**Ключевые наблюдения:**

- **Bun показывает меньшую загрузку CPU** при высоком throughput — JavaScriptCore оптимизирован для производительности
- **Node.js стабилен** под долгой нагрузкой — V8 лучше справляется с длительными процессами
- **Deno балансирует** между производительностью и стабильностью

**⚠️ Важно:** В production с реальными БД и бизнес-логикой разница в CPU может быть менее заметна. Рекомендуется тестировать на вашем реальном коде.

---

### Скорость установки зависимостей

**Версии менеджеров пакетов:**

- npm v12.x
- yarn v4.x (Berry)
- pnpm v11.x
- bun v1.3.14 (встроенный)

#### Сравнение менеджеров пакетов

Время установки пакетов в зависимости от менеджера и сценария (в секундах, меньше — лучше):

| Сценарий | npm v12 | yarn v4 | pnpm v11 | bun v1.3 | Лидер |
|----------|---------|---------|----------|----------|-------|
| **Чистая установка** (без кэша) | 40s | 28s (-30%) | 15s (-62%) | **7s (-82%)** | 🏆 **bun** (5.7× быстрее) |
| **С кэшем** (повторная) | 18s | 12s (-33%) | 5.5s (-69%) | **2.5s (-86%)** | 🏆 **bun** (7.2× быстрее) |
| **CI с lockfile** (frozen) | 24s | 17s (-29%) | 10s (-58%) | **4.5s (-81%)** | 🏆 **bun** (5.3× быстрее) |
| **Обновление зависимостей** | 32s | 23s (-28%) | 12s (-62%) | **5.5s (-83%)** | 🏆 **bun** (5.8× быстрее) |
| **Монорепо** (~50 пакетов) | 110s | 40s (-64%) | 22s (-80%) | **12s (-89%)** | 🏆 **bun** (9.2× быстрее) |

_Проценты показывают улучшение относительно npm. Тестирование на проекте с ~200 зависимостями._

**Ключевые выводы:**

- 🥇 **Bun** — безусловный лидер (в 5-8 раз быстрее npm). Идеален для локальной разработки и CI/CD
- 🥈 **pnpm** — отличный баланс скорости и стабильности (в 2.5-5 раз быстрее npm). Экономит дисковое пространство
- 🥉 **yarn v4 (Berry)** — стабильное улучшение на 25-32%. Хороший выбор для больших команд
- **npm** — самый медленный, но наиболее совместимый. Встроен в Node.js

#### Сравнение по runtime

| Runtime | Встроенный менеджер | Чистая установка | С кэшем | Монорепо |
|---------|---------------------|------------------|---------|----------|
| Node.js v22 | npm v10.9 | 40s | 18s | 105s |
| Node.js v24 | npm v11.8 (улучш.) | 38s | 17s | 100s |
| Node.js v26 | npm v12.1 | 36s | 16s | 95s |
| Deno v2.5 | встроенный | 35s | 14s | 85s |
| Bun v1.3.14 | встроенный | **7s** | **2.5s** | **12s** |

_Node.js v22 показывает небольшое улучшение npm. Deno на 15-20% быстрее Node.js+npm благодаря оптимизированному встроенному менеджеру._

**Важные факторы, влияющие на производительность:**

- **Скорость интернет-соединения** — критична для первой установки
- **Тип файловой системы** — pnpm использует symlinks (может быть медленнее на Windows без WSL)
- **Количество и размер зависимостей** — влияет на разницу между менеджерами
- **postinstall скрипты** — могут нивелировать преимущества быстрых менеджеров
- **Версия менеджера** — yarn v1 classic в 2-3 раза медленнее v4 Berry

---

## Bun vs Deno: ключевые различия

| Критерий | Bun v1.3.14 | Deno v2.5 | Победитель |
|----------|-----|------|------------|
| **npm-совместимость** | 95%+ | 85%+ | 🏆 **Bun** |
| **Скорость установки** | 7s (чистая) | 35s | 🏆 **Bun** (5× быстрее) |
| **Cold start** | ~1.8ms | ~18ms | 🏆 **Bun** |
| **HTTP throughput** | 62k req/s | 75k req/s | 🏆 **Deno** (+21%) |
| **Миграция с Node.js** | Простая | Сложная | 🏆 **Bun** |
| **Встроенные инструменты** | Расширенные | Полные (REPL, formatter, debugger) | 🏆 **Deno** |
| **Безопасность** | Нет permissions | Permissions system | 🏆 **Deno** |
| **Web Standards** | Хорошая | Полная | 🏆 **Deno** |
| **Экосистема** | npm (2.5M+ пакетов) | deno.land/x (растет) | 🏆 **Bun** |

**Выбирайте Bun, если:** нужна максимальная npm-совместимость и скорость разработки с Node.js-кодом

**Выбирайте Deno, если:** приоритет — безопасность, производительность HTTP и новые проекты с нуля

---

## 🔒 Сравнение безопасности: Node.js vs Deno vs Bun

| Аспект | Node.js | Deno | Bun |
|--------|---------|------|-----|
| **Модель** | Open by default | Secure by default | Open by default |
| **Система разрешений** | ❌ Нет | ✅ Полная (--allow-*) | ❌ Нет |
| **Файловая система** | 🟢 Полный доступ | 🟠 Требуется --allow-read | 🟢 Полный доступ |
| **Сеть** | 🟢 Полный доступ | 🟠 Требуется --allow-net | 🟢 Полный доступ |
| **Env переменные** | 🟢 Полный доступ | 🟠 Требуется --allow-env | 🟢 Полный доступ |
| **Sandbox для untrusted code** | ❌ Нет | ✅ Есть | ❌ Нет |

**Ключевые выводы:**

- **Node.js и Bun** — подходят для приватных проектов с контролируемыми зависимостями. Риск supply chain attack такой же как в Node.js.
- **Deno** — единственный выбор для запуска недоверенного кода, edge computing, и security-critical приложений. Явные разрешения на все операции.

**Общие практики:**

1. Регулярно проверяйте уязвимости (`npm audit`, `bun audit`)
2. Используйте точные версии в package.json
3. Минимизируйте количество зависимостей
4. Проверяйте репутацию авторов пакетов

---

## TypeScript в 2026: Bun vs Node.js v26

Node.js v26 (juillet 2026) добавил встроенную поддержку TypeScript через `--experimental-strip-types`, но есть важные различия с Bun.

### Сравнение TypeScript поддержки

| Функция | Bun v1.3.14 | Node.js v26 | Победитель |
|---------|-------------|-------------|-----------|
| **Встроенная поддержка .ts** | ✅ Да | ✅ Да (флаг) | Ничья |
| **Запуск без конфига** | ✅ `bun app.ts` | ⚠️ `node --experimental-strip-types app.ts` | **Bun** |
| **JSX поддержка** | ✅ Полная | ❌ Нет | **Bun** |
| **Path aliases** (`@app/*`) | ✅ Из tsconfig.json | ❌ Игнорируются | **Bun** |
| **Type checking** | ❌ Нет (отдельно tsc) | ❌ Нет (отдельно tsc) | Ничья |
| **Скорость запуска** | ⚡ ~2ms | 🐢 ~19ms | **Bun (10×)** |
| **Встроенный bundler** | ✅ `bun build` | ❌ Нет | **Bun** |
| **Встроенный тест раннер** | ✅ `bun test` | ❌ Нет (только nodejs:test) | **Bun** |

### Конкретные примеры

**Сценарий 1: Простой TypeScript скрипт**

```typescript
// app.ts
const greeting: string = "Hello";
console.log(greeting);
```

**Bun:**
```bash
bun app.ts  # Работает! 2ms
```

**Node.js:**
```bash
node --experimental-strip-types app.ts  # Работает, но медленнее ~19ms
```

**Преимущество Bun:** Команда проще, встроено по умолчанию.

**Сценарий 2: React/JSX приложение**

```typescript
// app.tsx
import React from "react";
const App = () => <h1>Hello</h1>;
export default App;
```

**Bun:**
```bash
bun app.tsx  # Работает! JSX поддержан нативно
```

**Node.js:**
```bash
node app.tsx  # ❌ Ошибка: JSX не поддерживается
# Нужно использовать tsx или next.js
```

**Преимущество Bun:** Встроенная JSX поддержка без доп. инструментов.

**Сценарий 3: Path aliases**

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@app/*": ["src/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}

// src/app.ts
import { helper } from "@utils/helpers";  // работает в Bun
```

**Bun:**
```bash
bun app.ts  # ✅ Работает, читает tsconfig.json
```

**Node.js:**
```bash
node --experimental-strip-types app.ts  # ❌ Path aliases игнорируются
# Нужно: node_modules/.bin/tsx, tsc-paths, или относительные импорты
```

**Преимущество Bun:** Полная поддержка tsconfig.json paths.

### Когда использовать что

**Выбирайте Bun, если:**
- ✅ Работаете с TypeScript/JSX регулярно
- ✅ Используете path aliases в tsconfig
- ✅ Нужна максимальная скорость разработки
- ✅ Строите CLI, скрипты, серверные приложения

**Node.js v26 достаточен, если:**
- ✅ Используете только простые .ts файлы без JSX
- ✅ Не полагаетесь на path aliases
- ✅ Нужна максимальная совместимость с экосистемой
- ✅ Требуется убедиться в запуске на стандартном Node

**Используйте оба:**
- Локально разрабатывайте на Bun (10× быстрее)
- В production дорабатывайте Node.js совместимость
- На CI тестируйте на обоих (Bun и Node v26)

---

## Когда стоит использовать Bun

✅ **Рекомендуется использовать:**

- **Локальная разработка и DX** — значительное ускорение установки, тестирования и сборки
- **CLI-инструменты и скрипты** — быстрый старт критичен
- **Новые проекты** с контролируемым количеством зависимостей
- **Разработка, не критичная к памяти** (мощные dev машины, not-edge-constrained)
- **Приватные микросервисы** с полным контролем над зависимостями
- **v1.3.14:** Production приложения с хорошей стабильностью и производительностью (текущая версия на июль 2026)

⚠️ **Используйте с осторожностью (проведите бенчмарки):**

- **Production HTTP-сервисы** — проверьте реальное потребление памяти (может быть +30-40% vs Node.js)
- **Serverless/Edge Functions** — холодный старт может быть медленнее Node.js, плюс memory overhead
- **Приложения с большим количеством зависимостей** — потребление памяти может быть критичным
- **Монитор-системы с ограничением памяти** — проверьте Kubernetes pod memory limits
- **Долгоживущие процессы** — V8 (Node.js) имеет лучший garbage collection для production

❌ **Не рекомендуется:**

- **Критичные системы**, требующие максимальной стабильности и зрелости
- Проекты с нативными модулями или `worker_threads` (требуется переписывание)
- **Production на edge/serverless** без предварительного тестирования
- **Приложения с ограничением памяти**, где каждый MB критичен

## Ограничения и моменты внимания

### Основные ограничения

- **JavaScriptCore vs V8:** Поведение некоторых Node.js API может отличаться
- **Нативные модули:** Высокая вероятность несовместимости с `.node` / `node-gyp` аддонами
- **Стремительное развитие:** Частые breaking changes, следите за релизами

### Детальная выжимка ограничений

| Область | Проблема | Решение |
|---------|----------|---------|
| **Нативные аддоны** (.node / node-gyp) | Высокая вероятность несовместимости | Замените на pure-JS альтернативы или изолируйте в микросервис |
| **worker_threads / cluster** | Не поддерживаются | Переписывайте под Web Workers API |
| **Streams / HTTP** | Различия в backpressure/событиях | Тестируйте интеграции |
| **ESM vs CJS** | Смешанный CJS код может вызвать проблемы | Конвертируйте в ESM при возможности |
| **CI/Deploy** | Специфичные сборки | Используйте fallback-контейнеры с Node |

**Вероятность проблем:** Зависит от архитектуры проекта. Чистые JS/TS проекты с web-ориентированными библиотеками сталкиваются с проблемами реже.

## Работа с многопоточностью в Bun

Bun использует **Web Worker API** (аналогично браузерам), а не Node.js `worker_threads`. Это делает модель совместимой с web-ориентированным API и достаточно удобной для CPU-интенсивных задач.

### Ключевые моменты

- Создаёте воркер с `new Worker(...)` и общаетесь через `postMessage`/`onmessage`
- Используйте `MessageChannel` для двунаправленной связи
- Для передачи бинарных данных применяйте Transferable-объекты (ArrayBuffer) — быстро, без копирования
- Для изоляции процессов используйте `Bun.spawn`

### Простой пример (Web Worker)

```js
// worker.js
self.onmessage = (e) => {
  const arr = e.data || [];
  const sum = arr.reduce((a, x) => a + x, 0);
  self.postMessage({ sum });
};
```

```js
// main.js
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
worker.onmessage = (e) => {
  console.log('Sum from worker:', e.data.sum);
};
worker.postMessage([1, 2, 3, 4, 5]);
```

### Transferable объекты (без копирования)

```js
// main.js
const buffer = new ArrayBuffer(1024 * 8);
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
worker.postMessage(buffer, [buffer]); // buffer передаётся как transferable

// worker.js
self.onmessage = (e) => {
  const view = new Uint8Array(e.data);
  // ... heavy task без копирования данных
  self.postMessage({ ok: true });
};
```

### MessageChannel для двунаправленной связи

```js
// main.js
const chan = new MessageChannel();
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
worker.postMessage({ port: chan.port2 }, [chan.port2]);
chan.port1.onmessage = (e) => console.log('From worker:', e.data);
chan.port1.postMessage('ping');

// worker.js
self.onmessage = (e) => {
  const port = e.data.port;
  port.onmessage = (ev) => port.postMessage('pong');
};
```

### Использование Bun.spawn (отдельный процесс)

```js
const p = Bun.spawn({
  cmd: ["node", "worker-process.js"],
  stdout: 'pipe',
  stdin: 'pipe'
});
p.stdin.write(JSON.stringify({data: 'hi'}));
```

### Рекомендации

- **CPU-задачи:** Используйте Web Workers или отдельные процессы
- **IO-задачи:** Предпочтительнее асинхронные/event-based подходы
- **Миграция с Node.js:** Переписывайте `worker_threads` код под Web Worker API или используйте условную детекцию: `if (typeof Bun !== 'undefined') ...`

---

## Запуск Bun как daemon: процесс менеджеры

Для production-систем на виртуальных серверах (VPS) нужна гарантия, что приложение продолжит работать после перезагрузки, сбоев и остановок. Для этого используются процесс менеджеры.

### 1. Systemd (Linux, рекомендуется)

**Systemd** — встроенный init-система на современных Linux дистрибутивах. Это нативное решение без доп. зависимостей.

**Создание service файла** в `/lib/systemd/system/my-app.service`:

```ini
[Unit]
Description=My Bun App
After=network.target

[Service]
Type=simple
User=YOUR_USER
WorkingDirectory=/home/YOUR_USER/path/to/my-app
ExecStart=/home/YOUR_USER/.bun/bin/bun run index.ts
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

**Команды управления:**

```bash
# Включить автозагрузку при старте
systemctl enable my-app

# Запустить сейчас
systemctl start my-app

# Проверить статус
systemctl status my-app

# Остановить
systemctl stop my-app

# Перезапустить
systemctl restart my-app

# Просмотр логов
journalctl -u my-app -f
```

**Для прослушивания портов 80/443 без root:**

```bash
setcap CAP_NET_BIND_SERVICE=+eip ~/.bun/bin/bun
```

**Преимущества:**
- ✅ Встроено в Linux
- ✅ Нет доп. зависимостей
- ✅ Автоматические перезагрузки
- ✅ Логирование через journalctl
- ✅ Управление ресурсами (CPU, memory limits)

### 2. PM2 (кроссплатформенный)

**PM2** — популярный процесс менеджер для Node.js и других runtime. Работает на Linux, macOS, Windows.

**Установка:**

```bash
npm install -g pm2
# или через Bun:
bun add -g pm2
```

**Способ 1: CLI**

```bash
pm2 start --interpreter ~/.bun/bin/bun index.ts --name "my-app"
```

**Способ 2: Конфиг-файл** `pm2.config.js`:

```js
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "index.ts",
      interpreter: "bun",
      env: {
        PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
        NODE_ENV: "production"
      },
      instances: 2,
      exec_mode: "cluster",
      restart_delay: 4000,
      autorestart: true,
      max_memory_restart: "500M"
    }
  ]
};
```

Запуск: `pm2 start pm2.config.js`

**Команды:**

```bash
pm2 list              # список приложений
pm2 logs my-app       # логи
pm2 stop my-app       # остановить
pm2 restart my-app    # перезапустить
pm2 delete my-app     # удалить
pm2 save              # сохранить список
pm2 startup           # включить автозагрузку при старте ОС
```

**Преимущества:**
- ✅ Кроссплатформенный
- ✅ Cluster mode (масштабирование)
- ✅ Встроенный мониторинг
- ✅ Простой интерфейс
- ✅ Логирование и ротация логов

**Недостатки:**
- ❌ Дополнительная зависимость
- ❌ Для systemd PM2 "лишний слой"

### 3. Docker (контейнеризация, облако)

Для облачных платформ и Kubernetes используйте Docker.

**Минимальный Dockerfile для production:**

```dockerfile
# Stage 1: build
FROM oven/bun:1.3.14 AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN bun install --production

# Stage 2: runtime
FROM oven/bun:1.3.14
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["bun", "run", "index.ts"]
```

**Запуск:**

```bash
docker build -t my-bun-app .
docker run -p 3000:3000 my-bun-app
```

**Преимущества:**
- ✅ Работает везде (локально, облако, Kubernetes)
- ✅ Консистентная окружение
- ✅ Встроенная изоляция ресурсов
- ✅ Легкое масштабирование

### 4. Встроенный watch режим

**Важно:** Bun имеет встроенный watch режим, который может использоваться вместо процесс менеджера для development:

```bash
bun --watch index.ts
```

Но для production используйте PM2 или systemd для гарантии надежности.

### Рекомендации по выбору

| Сценарий | Решение | Причина |
|----------|---------|---------|
| **VPS/Dedicated server** | Systemd (Linux) или PM2 | Встроено или универсально |
| **Микросервисы/Облако** | Docker + Kubernetes | Масштабируемость |
| **Локальное тестирование** | Встроенный `--watch` | Простота |
| **Windows production** | PM2 или Docker | Systemd не доступен |
| **Высокая нагрузка** | PM2 cluster mode | Несколько процессов |
| **Простая setup** | Systemd (Linux) | Нет зависимостей |

---

## Bun в CI/CD: GitHub Actions

GitHub Actions — встроенный CI/CD в GitHub. Bun интегрируется просто и обеспечивает значительное ускорение pipeline благодаря быстрой установке зависимостей.

### Базовый workflow

Создайте файл `.github/workflows/ci.yml`:

```yaml
name: Bun CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Клонировать репозиторий
      - uses: actions/checkout@v4
      
      # Установить Bun
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
      
      # Установить зависимости
      - name: Install dependencies
        run: bun install
      
      # Запустить тесты
      - name: Run tests
        run: bun test
      
      # Построить приложение
      - name: Build
        run: bun run build
```

### Кэширование зависимостей

Для ускорения pipeline кэшируйте Bun зависимости:

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.bun/install/cache
    key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
    restore-keys: |
      ${{ runner.os }}-bun-
      
- name: Install dependencies
  run: bun install
```

**Результат:** Первый запуск загружает пакеты, последующие используют кэш (в 10+ раз быстрее).

### Параллельное тестирование

Запустите тесты на нескольких machines для ускорения:

```yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
    
steps:
  - uses: actions/checkout@v4
  - uses: oven-sh/setup-bun@v2
  - run: bun install
  - name: Run tests (shard ${{ matrix.shard }}/4)
    run: bun test --shard=${{ matrix.shard }}/4
```

**Преимущество:** 4 машины тестируют одновременно → в 3-4 раза быстрее.

### Тестирование изменённых файлов

Запустите только тесты затронутых файлов:

```yaml
steps:
  - uses: actions/checkout@v4
    with:
      fetch-depth: 0  # получить всю историю
  - uses: oven-sh/setup-bun@v2
  - run: bun install
  - name: Run affected tests only
    run: bun test --changed
```

**Результат:** При малых PR'ов — тесты бегут в 10+ раз быстрее.

### Отчёты в JUnit формате

Для интеграции с системами отчётности:

```yaml
- name: Run tests with JUnit report
  run: bun test --reporter=junit --reporter-outfile=test-results.xml
  
- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: test-results.xml
```

### Проверка типов TypeScript

Bun НЕ делает type checking. Добавьте явно:

```yaml
- name: Type check
  run: bunx tsc --noEmit
  
- name: Lint
  run: bun run lint
  
- name: Test
  run: bun test
  
- name: Build
  run: bun run build
```

### Полный production workflow

```yaml
name: Production CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main, develop]

env:
  BUN_VERSION: 1.3.14

jobs:
  quality:
    runs-on: ubuntu-latest
    name: Quality Checks
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: ${{ env.BUN_VERSION }}
      
      - uses: actions/cache@v4
        with:
          path: ~/.bun/install/cache
          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
      
      - run: bun install
      
      - name: Type Check
        run: bunx tsc --noEmit
      
      - name: Lint
        run: bun run lint
  
  test:
    runs-on: ubuntu-latest
    name: Tests (shard ${{ matrix.shard }}/4)
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: ${{ env.BUN_VERSION }}
      
      - uses: actions/cache@v4
        with:
          path: ~/.bun/install/cache
          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
      
      - run: bun install
      
      - name: Run Tests
        run: bun test --shard=${{ matrix.shard }}/4 --reporter=junit --reporter-outfile=test-results-${{ matrix.shard }}.xml
      
      - name: Upload Test Results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ matrix.shard }}
          path: test-results-${{ matrix.shard }}.xml
  
  build:
    needs: [quality, test]
    runs-on: ubuntu-latest
    name: Build
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: ${{ env.BUN_VERSION }}
      
      - uses: actions/cache@v4
        with:
          path: ~/.bun/install/cache
          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
      
      - run: bun install
      - run: bun run build
      
      - name: Upload Build Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      
      - name: Download Build
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: dist/
      
      - name: Deploy to Production
        run: |
          # Ваш скрипт деплоя
          echo "Deploying to production..."
```

### Ключевые преимущества Bun в CI/CD

| Аспект | Выигрыш |
|--------|---------|
| **Установка пакетов** | 5-8x быстрее npm |
| **Кэширование** | ~/.bun/install/cache автоматический |
| **Параллельное тестирование** | `--shard` встроено в bun test |
| **Только изменённые тесты** | `--changed` экономит 70-90% времени |
| **Размер образа** | Bun меньше чем Node.js |
| **Скорость сборки** | `bun build` быстрее webpack/esbuild |

### Рекомендации

✅ **Всегда:**
- Кэшируйте `~/.bun/install/cache` с ключом по `bun.lockb`
- Используйте `--changed` для PR'ов
- Параллелизируйте тесты через `--shard`

⚠️ **Помните:**
- Bun НЕ проверяет типы — используйте `tsc --noEmit`
- Версия Bun указывается явно, не полагайтесь на latest
- Кэширование работает лучше с Ubuntu (макос медленнее)

---

## Пример: Bun в AWS Lambda

Bun можно запускать в AWS Lambda двумя способами:

1. **Контейнерный образ** (рекомендуется)
2. Custom runtime

### Минимальный Dockerfile

**Для стабильного production (v1.3.14):**

```dockerfile
FROM oven/bun:1.3.14
COPY . /app
WORKDIR /app
RUN bun install
CMD ["bun", "run", "start"]
```

**Для использования новой версии (v1.4.0 на Rust):**

```dockerfile
FROM oven/bun:1.4.0
COPY . /app
WORKDIR /app
RUN bun install
CMD ["bun", "run", "start"]
```

**Рекомендация:** v1.3.14 для надежного production. v1.4.0 доступна если нужны улучшения памяти и исправления багов.

**Важно:** В serverless-окружениях cold start с Bun может быть медленнее Node.js из-за загрузки нестандартного runtime.

---

## Нюансы использования с популярными облачными провайдерами

### AWS (Amazon Web Services)

**⚠️ Важно:** AWS Lambda НЕ имеет официальной поддержки Bun в управляемых runtime (только Node.js, Python, Java, .NET).

**AWS Lambda:**

- ⚠️ **Bun не в списке управляемых runtime** — нужно использовать контейнеры или custom runtime
- ✅ **Поддержка через контейнеры** — используйте Docker образы с Bun
- ✅ **Custom runtime** — используйте `provided.al2023` runtime с Bun
- ⚠️ **Cold start медленнее** — загрузка нестандартного runtime добавляет 100-300ms
- ⚠️ **Размер образа** — Bun runtime увеличивает размер Lambda образа на ~50-80MB
- 💡 **Рекомендация:** Используйте Provisioned Concurrency для критичных функций

**AWS ECS/Fargate:**

- ✅ **Отличная совместимость** — контейнеры работают стабильно
- ✅ **Меньше проблем с cold start** — долгоживущие контейнеры
- ⚠️ **Memory overhead** — учитывайте +30-40% памяти в production

**AWS Elastic Beanstalk:**

- ✅ **Работает через Docker** — используйте Multi-container Docker платформу
- ⚠️ **Нет нативной поддержки** — требуется кастомная конфигурация

### Google Cloud Platform

**⚠️ Важно:** Google Cloud НЕ имеет официальной поддержки Bun (только Node.js, Python, Go, Java).

**Cloud Functions:**

- ❌ **Нет официальной поддержки** — только Node.js, Python, Go, Java runtime
- 💡 **Альтернатива:** Используйте Cloud Run с контейнерами

**Cloud Run:**

- ✅ **Полная поддержка** — любые контейнеры (включая Bun) работают отлично
- ✅ **Быстрое масштабирование** — подходит для Bun приложений
- ⚠️ **Cold start** — аналогично AWS Lambda, медленнее Node.js
- 💡 **Рекомендация:** Лучший выбор в Google Cloud для Bun приложений

**Google Kubernetes Engine (GKE):**

- ✅ **Стабильная работа** — полная совместимость с контейнерами Bun
- ⚠️ **Production нюансы** — см. исследования Anton Putra (Node.js стабильнее под нагрузкой)

### Microsoft Azure

**⚠️ Важно:** Azure Functions НЕ имеет официальной поддержки Bun (только .NET, Java, Node.js, Python, Go, PowerShell).

**Azure Functions:**

- ❌ **Нет официальной поддержки** — только .NET, Java, Node.js, Python, PowerShell, Go
- 💡 **Альтернатива 1:** Custom Handlers — легкие web серверы для любых языков
- 💡 **Альтернатива 2:** Azure Container Instances для контейнеризованных приложений

**Custom Handlers для Azure Functions:**

- ✅ **Поддерживают Bun** — HTTP-based handler для любого языка
- ✅ **Полная совместимость** — работает с Bun приложениями
- ⚠️ **Немного сложнее** — требует специальной конфигурации `function.json`

**Azure Container Instances (ACI):**

- ✅ **Полная поддержка** — любые Docker образы (включая Bun)
- ✅ **Быстрый деплой** — хорошо подходит для Bun
- 💡 **Рекомендация:** Лучший выбор если нужен контейнер

**Azure Kubernetes Service (AKS):**

- ✅ **Работает стабильно** — стандартные Kubernetes workloads с Bun контейнерами
- ⚠️ **Memory limits** — будьте внимательны к потреблению памяти Bun

### Vercel

- ✅ **Экспериментальная поддержка** — официально поддерживается с Vercel Functions
- ✅ **Оптимизирован для Next.js** — хорошо работает с Bun
- ⚠️ **Edge Runtime не поддерживает** — только Node.js runtime в Edge
- 💡 **Рекомендация:** Используйте для Serverless Functions, не для Edge

### Cloudflare

**Cloudflare Workers:**

- ❌ **Не поддерживается** — только V8 isolates с ограниченным API
- 💡 **Альтернатива:** Используйте стандартный Node.js или Deno (официально поддерживается)

**Cloudflare Pages Functions:**

- ❌ **Не поддерживается** — аналогично Workers

### Railway / Render / Fly.io

**Railway:**

- ✅ **Полная поддержка** — автоматическая детекция через `bun.lockb`
- ✅ **Нативная интеграция** — можно использовать `bun install` в build process

**Render:**

- ✅ **Работает через Docker** — используйте Docker deployment
- ⚠️ **Нет нативной поддержки** — требуется Dockerfile

**Fly.io:**

- ✅ **Отличная поддержка** — рекомендуется сообществом
- ✅ **Быстрый деплой** — хорошо оптимизирован для контейнеров
- 💡 **Рекомендация:** Один из лучших вариантов для Bun в production

### Общие рекомендации для облачных деплоев

**✅ Подходит:**

- Долгоживущие контейнеры (ECS, Cloud Run, AKS, Kubernetes)
- PaaS с Docker поддержкой (Railway, Fly.io)
- Serverless с Provisioned Concurrency

**⚠️ Используйте с осторожностью:**

- Serverless без warm-up (Lambda, Cloud Functions)
- Edge computing платформы
- Окружения с жесткими memory limits

**❌ Не рекомендуется:**

- Cloudflare Workers (технически невозможно)
- Azure Functions без контейнеров
- Окружения без Docker поддержки

---

## Ссылки на источники и дополнительные материалы

### Официальная документация

- [Официальный сайт Bun](https://bun.sh)
- [GitHub: oven-sh/bun](https://github.com/oven-sh/bun)
- [Bun переписан на Rust (официальное объявление)](https://bun.com/blog/bun-in-rust) — планы переписывания v1.4.0 на Rust
- [Официальные бенчмарки Deno](https://deno.com/benchmarks)
- [Node.js Performance Working Group](https://github.com/nodejs/performance)

### Актуальные бенчмарки и сравнения (2025)

- [Bun vs Node.js 2025: Performance Comparison Guide - Strapi](https://strapi.io/blog/bun-vs-nodejs-performance-comparison-guide)
- [Node vs Deno vs Bun: The Ultimate 2025 Performance Battle](https://junkangworld.com/blog/node-vs-deno-vs-bun-the-ultimate-2025-performance-battle)
- [Bun vs Node Memory: The Real Performance Story Behind the Hype](https://ritik-chopra28.medium.com/bun-vs-node-memory-the-real-performance-story-behind-the-hype-5f1f8ab3b3e2)
- [State of Node.js Performance 2024 - NodeSource](https://nodesource.com/blog/State-of-Nodejs-Performance-2024)

### Production-ориентированные бенчмарки (Anton Putra)

Одним из наиболее комплексных подходов к тестированию является работа **Anton Putra** ([antonputra.com](https://antonputra.com)), DevOps-инженера, известного своими глубокими производственными бенчмарками:

**Видеообзоры производительности:**

- ["Bun vs Node.js: Performance Benchmark in Kubernetes"](https://youtu.be/EhkrlENi8i4) — детальный анализ производительности в контексте containerized-приложений
- ["Go (Golang) vs. Bun: Performance"](https://youtu.be/RdOkJYvl5TA) — сравнение Bun с компилируемыми языками
- ["Deno vs. Node.js vs Bun: Performance"](https://youtu.be/x0QOTSXI_Dc) — комплексное сравнение всех трёх runtime
- ["Deno vs. Node.js vs. Bun: Performance Comparison"](https://youtu.be/btm3LyY3ZVc) — обновлённое сравнение

**Методология Putra (отличается от синтетических бенчмарков):**

- 🗄️ **Реальные базы данных** — PostgreSQL/MongoDB в бенчмарках, не "Hello World"
- ☸️ **Kubernetes-реалистичные сценарии** — тесты в Pod'ах с ограничениями ресурсов
- 📊 **Prometheus + Grafana** — компромиссное измерение (latency, throughput, saturation, availability, CPU throttling)
- ⏱️ **Долгосрочные тесты** — 15+ минут на каждый сценарий для стабильности
- 🔄 **Идентичный код** — одна и та же бизнес-логика во всех runtime для честного сравнения
- 🌐 **Интеграция с сетью** — реальные подключения к БД, сетевой throughput, соединения

**Ключевые выводы из работ Putra:**

1. **Synthetic benchmarks лгут** — простые HTTP-тесты не отражают реальное поведение с БД и network I/O
2. **Bun лучше на CLI-инструментах** — быстрый старт, но в production с database это не такое заметное преимущество
3. **Node.js стабильнее в Kubernetes** — при длительной нагрузке V8 показывает более предсказуемое поведение
4. **Memory и CPU throttling** — важнейшие факторы в containerized environment, где Bun может показать худшие результаты
5. **Ecosystem maturity wins** — множество production-hardened библиотек и patterns для Node.js дают преимущество, несмотря на сырость Bun

### Производственные кейсы и практический опыт

- [Node vs Bun: no backend performance difference](https://evertheylen.eu/p/node-vs-bun/)
- [Investigating a Severe Performance Regression in Node.js v22 and v24](https://github.com/nodejs/node/issues/60719)
- [Deno 2.0: The Next Evolution in JavaScript Runtime](https://ikiran.vercel.app/insights/deno-2-revolutionizing-javascript-runtime)

### Инструменты для тестирования

- [GitHub: denosaurs/bench - Comparing HTTP frameworks](https://github.com/denosaurs/bench)
- [GitHub: RafaelGSS/nodejs-bench-operations](https://github.com/RafaelGSS/nodejs-bench-operations)

---

## Итоги

**Сильные стороны Bun:**

- ⚡ Исключительная скорость установки пакетов (в 5-8 раз быстрее npm)
- 🚀 Быстрый запуск приложений (cold start ~2ms в локальных тестах)
- 📦 Встроенные инструменты: runtime, bundler, test runner, package manager
- 🔄 TypeScript из коробки без дополнительной настройки
- 🎯 Простота использования и минимальная конфигурация

**Слабые стороны и ограничения:**

- 🧠 **Память: противоречивые результаты** — синтетические бенчмарки показывают паритет, production часто показывает +30-40% vs Node.js
- ⚠️ Несовместимость с некоторыми нативными Node.js модулями
- 🔧 Требует переписывания кода, использующего `worker_threads`
- 🌩️ Медленный cold start в serverless-окружениях (AWS Lambda)
- 🔄 Быстрое развитие с частыми breaking changes

**Рекомендации по применению:**

- **Локальная разработка:** Отличный выбор для ускорения workflow
- **Новые проекты:** Минимум конфигурации, быстрый старт
- **CI/CD:** Значительная экономия времени на установке пакетов
- **Production:** Проведите собственное тестирование памяти перед миграцией (real code, real load)
- **Монорепозитории:** Драматическое улучшение скорости работы с пакетами
- **Serverless/Edge:** Требует особого внимания к memory overhead — может быть хуже Node.js

---

**Отказ от ответственности:** Данные в этой статье собраны из публичных источников и независимых бенчмарков. Производительность сильно зависит от конкретного use-case, архитектуры приложения, версий ПО и аппаратного обеспечения. Рекомендуется проводить собственное тестирование для вашего конкретного сценария использования.

---

**Автор-составитель:** Виталий Балабанов
