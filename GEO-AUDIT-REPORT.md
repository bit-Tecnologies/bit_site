# GEO-аудит: bit Tecnologies

**Дата аудита:** 13 сентября 2026
**URL:** https://bit-tecnologies.vercel.app/
**Тип бизнеса:** Open-source разработчик ПО (экосистема приватных Android-приложений) — ближайший аналог по методике GEO: SaaS/Software
**Проанализировано страниц:** 7 уникальных маршрутов × 2 языка (ru/en) = 14, плюс /privacy/, /about/ → 16 URL по sitemap

---

## Резюме

**Итоговый GEO-балл: 41/100 (Poor)**

Технически сайт — крепкий фундамент: чистый статический Astro-рендеринг без зависимости от JS, аккуратная структура URL, есть `llms.txt`, есть JSON-LD на части страниц. Но три вещи тянут оценку вниз до "Poor": (1) сайт до аудита ссылался сам на себя по несуществующему домену `pages.dev` во всех критичных местах (canonical, sitemap, robots.txt, schema, llms.txt) — это исправлено в коде в рамках этого аудита, но **требует деплоя**; (2) почти нулевое присутствие бренда за пределами собственного сайта (Brand Authority 5/100 — ни Wikipedia, ни Reddit, ни LinkedIn, ни YouTube); (3) отсутствие любых сигналов авторства/команды (нет ни одного имени, фото, контакта) — критично для E-E-A-T.

### Изменения, внесённые в ходе аудита

Пока писался этот отчёт, я сразу исправил то, что можно исправить кодом (не задеплоено — см. "Критические проблемы" ниже):

| Файл | Что изменено |
|---|---|
| [public/robots.txt](public/robots.txt) | Добавлены явные правила для AI-краулеров: разрешены поисково-цитирующие боты (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-User`, `Claude-SearchBot`, `Applebot`, `Amazonbot`), заблокированы чисто обучающие (`GPTBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`, `FacebookBot`/`meta-externalagent`, `Diffbot`, `ImagesiftBot`, `Omgili(bot)`, `cohere-ai`, `Timpibot`, `Webzio-Extended`). Домен sitemap исправлен на `vercel.app`. |
| [astro.config.mjs](astro.config.mjs) | `site:` исправлен с `bit-tecnologies.pages.dev` на `https://bit-tecnologies.vercel.app` |
| [public/llms.txt](public/llms.txt) | Все ссылки переведены на актуальный домен |
| [src/layouts/Layout.astro](src/layouts/Layout.astro) | Fallback `Organization` JSON-LD теперь строится через `Astro.site`, а не хардкод |
| [src/pages/index.astro](src/pages/index.astro) | `WebSite` JSON-LD теперь строится через `Astro.site`, а не хардкод |

**Важный нюанс по ClaudeBot:** он намеренно не заблокирован отдельно (подпадает под общий `Allow: /`). Anthropic не разделяет для ClaudeBot краулинг для обучения и для цитирования в ответах Claude — это один и тот же бот. Блокировка убрала бы сайт из поля зрения Claude полностью, а не только из обучающих данных. Если для вас принципиальна именно эта развилка — скажите, добавлю блок с пониманием последствий.

### Разбивка по категориям

| Категория | Балл | Вес | Взвешенный балл |
|---|---|---|---|
| AI Citability | 64/100 | 25% | 16.0 |
| Brand Authority | 5/100 | 20% | 1.0 |
| Content E-E-A-T | 31/100 | 20% | 6.2 |
| Technical GEO | 66/100 | 15% | 9.9 |
| Schema & Structured Data | 46/100 | 10% | 4.6 |
| Platform Optimization | 34/100 | 10% | 3.4 |
| **Итоговый GEO-балл** | | | **41/100** |

---

## Критические проблемы (исправить немедленно)

1. **Правки не задеплоены — прод отдаёт старую версию.** На момент проверки субагентами `https://bit-tecnologies.vercel.app/robots.txt`, `/sitemap.xml`, `/llms.txt` и все canonical/og:url/JSON-LD теги всё ещё указывали на несуществующий домен `bit-tecnologies.pages.dev`. Все правки выше сделаны локально и собраны (`npm run build` прошёл успешно, в `dist/` домен везде верный) — **нужен commit + push + деплой на Vercel**, иначе ничего из вышеперечисленного не работает на живом сайте.
2. **GitHub-организация `github.com/bit-Tecnologies` в bio до сих пор указывает на `pages.dev`.** Это независимый источник рассинхронизации entity-сигналов (сайт ↔ GitHub) — нужно обновить вручную в настройках организации на GitHub.
3. **Бренд не существует ни на одной внешней платформе, которую используют AI-модели для entity recognition:** Wikipedia — не найдено, Reddit — не найдено, LinkedIn — не найдено, YouTube — не найдено. Это самый тяжёлый компонент общей оценки (Brand Authority 5/100).
4. **Нет ни одного упоминания автора/команды/контактов на сайте** — ни имени, ни фото, ни email, ни формы обратной связи. Критично для Trustworthiness/Expertise-сигналов, которые ИИ и Google используют при решении, цитировать источник или нет.

## Высокий приоритет (в течение недели)

5. **Отсутствует `Organization` JSON-LD на главной странице.** Сейчас на `/` задан только `WebSite`, а `Organization` подставляется лишь как fallback на страницах без собственной схемы (например, `/bit-hub/` из-за этого ошибочно помечен как `Organization` вместо `SoftwareApplication`).
6. **`sameAs` содержит только GitHub.** Нет Wikidata/LinkedIn/X — самый мощный и дешёвый сигнал entity-linking сейчас используется на 10-15% потенциала.
7. **Флагманский продукт bit Hub не имеет собственной `SoftwareApplication`-схемы** (в отличие от bit Delta/Launcher/Record, у которых она есть, хоть и минимальная).
8. **Нет заголовков безопасности** (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) — на Vercel нет `vercel.json` с секцией `headers`. Не блокирует AI-краулеры, но снижает общий технический балл и является базовой гигиеной.
9. **Нет дат публикации/обновления** ни на одной странице — критично для сигнала свежести контента (Perplexity, ChatGPT).
10. **Заголовки товарные, а не в формате вопрос-ответ** ("Продукты" вместо "Что умеет bit Hub?") — упущенная возможность для Google AI Overviews.
11. **Нет Terms of Service** (только Privacy Policy).

## Средний приоритет (в течение месяца)

12. Продуктовые страницы тонкие (350-400 слов), нет FAQ-блоков, нет объяснения архитектурных решений ("почему без телеметрии", "почему GPLv3/MIT").
13. `WebSite` схема без `SearchAction` (упущены sitelinks search box).
14. `AboutPage` не связан с `Organization` через `mainEntity`.
15. Нет `Person`-схемы для мейнтейнеров — упущенный E-E-A-T сигнал для open-source проекта.
16. Открытый код на GitHub подан вскользь — нет звёзд/контрибьюторов/активности на самих страницах сайта, хотя это сильный доступный trust-сигнал.
17. `bit-together` (стадия Planning) имеет `offers.price: "0"` — потенциально вводящее в заблуждение структурированное заявление о несуществующем продукте.
18. Не найдено `hreflang`-тегов на живых страницах на момент проверки (должно исправиться после деплоя, т.к. в `Layout.astro` они строятся корректно).

## Низкий приоритет (по возможности)

19. Нет `/llms-full.txt` (расширенная версия llms.txt).
20. Нет `BreadcrumbList` на внутренних страницах.
21. Не используется `speakable` (сигнал для голосовых ассистентов).
22. В sitemap нет `<lastmod>`.
23. Раздел "Скриншоты готовятся" на `/bit-hub/` пустой.

---

## Детали по категориям

### AI Citability — 64/100
Лучшие цитируемые блоки — короткие самодостаточные утверждения о приватности ("Мы не продаём ваши данные, потому что не собираем их") и определение bit Hub как "нативного клиента для GitHub-релизов" — оба оцениваются в 80-85/100 по цитируемости. Но таких блоков мало, а большинство продуктов помечено как Beta/In development/Planned, что снижает воспринимаемую готовность к цитированию.

### Brand Authority — 5/100
Ноль подтверждённых упоминаний на Wikipedia (проверено через Wikipedia API), Reddit, YouTube, LinkedIn. Единственный внешний след — GitHub-организация, но и та указывает неверный домен в bio.

### Content E-E-A-T — 31/100
Experience 5/25, Expertise 9/25, Authoritativeness 6/25, Trustworthiness 11/25. Главные провалы — отсутствие автора/команды и контактов. Плюс — HTTPS, открытый исходный код, Privacy Policy.

### Technical GEO — 66/100
SSR/статика — 95/100 (весь контент в исходном HTML, AI-краулерам не нужен JS). Заголовки безопасности — 15/100 (только HSTS от Vercel по умолчанию). Краулинг/sitemap — 40/100 на момент проверки (до деплоя правок).

### Schema & Structured Data — 46/100
JSON-LD технически чистый (100% валиден, без Microdata/RDFa-мусора), но по содержанию неполный: нет объединяющей `Organization` на главной, `sameAs` почти пуст, у флагманского продукта неверный тип схемы.

### Platform Optimization — 34/100
Google AI Overviews 29/100, ChatGPT 37/100, Perplexity 35/100, Gemini 22/100 (нет ни одного сигнала в Google-экосистеме), Bing Copilot 47/100 (лучший результат за счёт активного GitHub-репозитория).

---

## Быстрые победы (на этой неделе)

1. **Задеплоить уже сделанные правки** (robots.txt, astro.config.mjs, llms.txt, Layout.astro, index.astro) — commit → push → Vercel redeploy. Без этого шага весь остальной список бессмысленен.
2. Обновить URL сайта в bio GitHub-организации `bit-Tecnologies` на актуальный домен.
3. Добавить `Organization` JSON-LD на главную (объединив с `WebSite` через `@graph`) и расширить `sameAs`.
4. Дать bit Hub собственную `SoftwareApplication`-схему вместо дефолтного `Organization`.
5. Добавить хотя бы имя/ник разработчика и email/контакт на страницу "О компании".

## План на 30 дней

### Неделя 1: Деплой и базовая инфраструктура
- [ ] Закоммитить и задеплоить правки robots.txt/astro.config.mjs/llms.txt/schema-хардкоды
- [ ] Обновить URL в GitHub-организации
- [ ] Перепроверить `/robots.txt`, `/sitemap.xml`, `/llms.txt` на проде через curl
- [ ] Добавить `vercel.json` с security-заголовками (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

### Неделя 2: Структурированные данные
- [ ] `Organization` + `WebSite` через `@graph` на главной с расширенным `sameAs`
- [ ] `SoftwareApplication` схема для bit Hub
- [ ] Дополнить существующие `SoftwareApplication` (description, author, screenshot, featureList) для bit Delta/Launcher/Record
- [ ] Убрать/скорректировать `offers.price` для bit Together (Planning stage)

### Неделя 3: Контент и E-E-A-T
- [ ] Добавить страницу/секцию "Команда" с именем, био, ссылкой на GitHub-профиль
- [ ] Добавить контактный email и Terms of Service
- [ ] Добавить FAQ-блок на главную и продуктовые страницы (вопрос-ответ формат)
- [ ] Переписать часть H2 в question-based формат

### Неделя 4: Внешнее присутствие и доработка
- [ ] Создать LinkedIn-страницу компании
- [ ] Разместить bit Hub в тематических списках (awesome-privacy, awesome-android на GitHub)
- [ ] Опубликовать пост о проекте на релевантном сабреддите (r/androidapps, r/privacy)
- [ ] Добавить `BreadcrumbList` и `<lastmod>` в sitemap

---

## Приложение: проверенные страницы

| URL | Заголовок | Основные проблемы |
|---|---|---|
| / | bit Tecnologies — Приватные Android-приложения | Нет Organization schema, нет вопрос-ответ заголовков |
| /about/ | О компании | Короткий (~280 слов), нет команды, AboutPage не связан с Organization |
| /bit-hub/ | bit Hub | Неверный тип схемы (Organization вместо SoftwareApplication), скриншоты "готовятся" |
| /bit-delta/ | bit Delta | SoftwareApplication минимальна (нет description/author/screenshot) |
| /bit-launcher/ | bit Launcher | То же |
| /bit-record/ | bit Record | То же |
| /bit-together/ | bit Together | offers.price=0 для несуществующего продукта |
| /privacy/ | Privacy Policy | — |
| /robots.txt | — | На момент проверки — старый домен в Sitemap (исправлено в коде, ждёт деплоя) |
| /llms.txt | — | На момент проверки — старый домен во всех ссылках (исправлено в коде, ждёт деплоя) |
