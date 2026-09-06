---
target: mobile version of the site
total_score: 20
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 3
timestamp: 2026-09-06T16-06-33Z
slug: src-pages-index-astro
---
### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Статическая hero-карточка хорошо объясняет состояние продукта, но нет явного состояния загрузки/ошибки для APK-ссылки. |
| 2 | Match System / Real World | 3 | Термины Android, SDK, APK и приватность понятны целевой аудитории; часть технических метрик требует контекста. |
| 3 | User Control and Freedom | 3 | Навигация и skip-link есть, но мобильное меню не сообщает открытое состояние и не закрывается по Escape. |
| 4 | Consistency and Standards | 3 | Общие компоненты и токены используются последовательно; язык переключается неочевидным toggle-действием. |
| 5 | Error Prevention | 3 | CTA крупные и touch-friendly, но ссылка скачивания не объясняет внешнюю загрузку/ошибку. |
| 6 | Recognition Rather Than Recall | 3 | Продукты, статусы и CTA видимы; мобильная навигация прячет ключевые разделы за иконкой. |
| 7 | Flexibility and Efficiency of Use | n/a | Лендинг не требует отдельного power-user режима. |
| 8 | Aesthetic and Minimalist Design | 3 | Сильная спокойная open-source подача, но на узких экранах hero-preview и декоративные эффекты начинают конкурировать с CTA. |
| 9 | Error Recovery | n/a | Для лендинга нет сложного транзакционного сценария, где recovery-flow обязателен. |
| 10 | Help and Documentation | n/a | Контекстная документация для рекламной страницы не является обязательной. |
| **Total** | | **20/28** | **Good, но мобильная шапка и первый экран требуют доработки перед релизом.** |

### Design Specificity Verdict

Сайт ощущается авторским для privacy-first Android-экосистемы: спокойная зелёная палитра, доказательства «0 трекеров / MIT / open source» и продуктовая hero-карточка работают на конкретный бренд. Однако часть визуального языка всё ещё типична для AI-generated SaaS: градиентные иконки на внутренних страницах, боковые/верхние акцентные полосы и чрезмерно широкая библиотека glow/float/bounce-эффектов.

Детерминированный скан нашёл 5 предупреждений: `ai-color-palette` в `src/pages/about.astro:104`, `side-tab` в `src/styles/global.css:746`, `bounce-easing` в `src/styles/global.css:15`, `layout-transition` в `src/styles/global.css:435` и ещё один `side-tab` в `src/styles/global.css:761`. Для мобильной версии критичнее всего layout-transition и лишние motion-эффекты: они повышают вероятность jank на слабых Android-устройствах. Визуальный overlay не включён: доступный браузер не дал надёжно инжектировать detector-скрипт и менять viewport, поэтому мобильные выводы дополнены чтением responsive-классов и source-level проверкой.

### Overall Impression

Хорошая основа и заметно более зрелая визуальная система, чем у типового лендинга: CTA понятен, контент сканируется, а страницы продуктов складываются в единый каталог. Самая большая возможность — сделать мобильный первый экран менее «сжатым desktop-ом»: освободить шапку, упростить hero-preview и перенести доказательства ближе к действию.

### What's Working

- Крупный основной CTA с минимальной высотой 44px и полноширинным поведением на mobile — правильное решение для thumb-first сценария.
- Продуктовая сетка корректно переходит к одной колонке до `md`, а внутренние страницы используют `grid-cols-1` до планшета.
- В проекте есть skip-link, focus-visible стили, semantic headings, `prefers-reduced-motion` и design tokens для светлой/тёмной темы.

### Priority Issues

- **[P1] Мобильная шапка может не помещаться на 320 px.** Логотип `bit Tecnologies` плюс language toggle, theme toggle и menu button занимают почти всю строку; language control содержит иконку, и текущий язык, хотя на мобильном доступного места мало. Это повышает риск визуального сжатия или горизонтального overflow на старых/узких устройствах. **Fix:** на `max-width: 380px` оставить логотип с уменьшенным wordmark или скрыть текущий `ru/en`, а language/theme объединить в меню. **Suggested command:** `$impeccable adapt`.

- **[P1] Hero-preview с пятью колонками слишком плотный для телефона.** В `src/pages/index.astro:151` пять карточек остаются `grid-cols-5` на любом viewport; при ширине 320px каждая карточка получает около 40–45px, где одновременно должны поместиться иконка, подпись и индикатор. Текст становится почти нечитаемым, а карточки теряют touch affordance. **Fix:** на mobile показать 3 карточки + горизонтальный scroll или заменить сетку на компактный список; оставить 5 колонок только от `sm`. **Suggested command:** `$impeccable adapt`.

- **[P1] Мобильное меню не объявляет состояние и имеет хрупкую event-модель.** Кнопке `#mobile-menu-btn` не заданы `aria-expanded` и `aria-controls`; JS одновременно слушает `click` и `touchend`, что может привести к двойному переключению в отдельных браузерах. Меню также не закрывается по Escape и не возвращает фокус на кнопку. **Fix:** использовать один `click`, синхронизировать `aria-expanded`, добавить Escape/focus return и явный `id` в `aria-controls`. **Suggested command:** `$impeccable harden`.

- **[P2] На мобильном слишком много вертикального воздуха до полезного контента.** `quiet-hero` начинается с `pt-32`, а fixed header занимает верхнюю область; на небольших экранах пользователь получает большой верхний отступ до badge и заголовка. Это отодвигает CTA ниже первого экрана. **Fix:** на `max-width: 640px` снизить top padding примерно до 6.5–7rem, сохранив safe-area. **Suggested command:** `$impeccable layout`.

- **[P2] Motion и blur тяжелее, чем нужно для mobile.** В системе есть `backdrop-filter: blur(30px)`, float/shimmer/pulse-анимации и layout-transition на width. На бюджетных Android это может ухудшить scroll smoothness; detector подтвердил layout animation и bounce easing. **Fix:** убрать blur с крупных поверхностей на mobile, а transitions оставить на `transform/opacity`; для декоративных анимаций задать более дешёвый mobile-вариант. **Suggested command:** `$impeccable optimize`.

### Persona Red Flags

**Jordan (First-Timer):** мобильная навигация скрывает «Приложения» и «О компании» за hamburger без текста; переключатель языка выглядит как control-menu, но фактически мгновенно меняет язык. Не хватает явного подтверждения после перехода/скачивания APK.

**Casey (Distracted Mobile User):** верхняя шапка перегружена тремя контролами, а ключевой download CTA находится далеко ниже hero-copy из-за большого top padding и preview-карточки. Если пользователь свернёт вкладку во время перехода к GitHub/APK, сайт не сохраняет контекст выбранного продукта.

**Sam (Accessibility-Dependent User):** `aria-label` у кнопки меню есть, но нет `aria-expanded`/`aria-controls`; focus return и Escape для меню не реализованы. Визуальное состояние раскрытого меню не объявляется screen reader-у.

### Minor Observations

- `alt=""` у маленьких иконок в hero-preview правильно убирает шум, но сами ссылки получают понятный `aria-label` — это стоит сохранить.
- На внутренних страницах используются большие `text-4xl` заголовки без отдельного mobile scale; они, вероятно, работают, но стоит проверить длинные русские заголовки на 320px.
- Цветовая система уже хорошо токенизирована, но legacy Tailwind utility overrides усложняют прогнозирование контраста и увеличивают стоимость поддержки.
- В сборке GitHub release API недоступен, поэтому используется fallback-версия; это не ломает build, но состояние download-данных стоит явно обозначить в UI.

### Questions to Consider

- Может ли первый экран на телефоне показать только одну сильную идею — «скачать bit Hub» — без пяти мини-карточек внутри preview?
- Действительно ли язык и тема должны быть отдельными контролами в мобильной шапке, или их лучше собрать в одно меню?
- Что важнее для бренда на mobile: декоративная «жидкость» поверхности или гарантированно быстрый scroll на слабом Android?
