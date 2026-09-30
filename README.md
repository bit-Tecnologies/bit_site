# bit Tecnologies

Официальный двуязычный сайт bit Tecnologies и каталог Android-приложений. Сайт собирается в статические страницы на Astro; русский язык используется по умолчанию, английские страницы находятся в `/en/`.

## Стек и состояние

- Astro, static output; стили собраны на Tailwind CSS v4 и `src/styles/global.css`.
- Тема следует сохранённому выбору пользователя, иначе системной настройке светлой/тёмной темы.
- Витрина продуктов: bit Hub, bit Delta, bit Record, bit Together и bit Launcher.
- Версия, размер и ссылка на APK bit Hub запрашиваются из GitHub Releases во время сборки. При ошибке запроса сайт использует текстовые значения по умолчанию.
- Канонический origin в `astro.config.mjs`: `https://bit-tecnologies.vercel.app`. В репозитории также есть `wrangler.toml` с настройкой Cloudflare Pages; фактическую платформу деплоя следует сверять с CI/панелью хостинга.

## Структура

```text
src/
  components/   общие Astro-компоненты
  i18n/         переводы и маршрутизация языков
  layouts/      общий HTML-шаблон, метаданные, темы и навигация
  pages/        русские маршруты и английские страницы в pages/en/
  scripts/      клиентский код
  styles/       глобальные стили и дизайн-токены
  utils/        вспомогательный код, включая GitHub Releases
public/         статические изображения, favicon, robots.txt и llms.txt
```

## Локальная работа

```sh
npm install
npm run dev
```

Полезные команды из `package.json`:

```sh
npm run lint       # Astro type/content diagnostics
npm run build      # production static build в dist/
npm run preview    # локальный просмотр собранного сайта
npm run format:check
```

## Документы

- [PRODUCT.md](PRODUCT.md) — аудитория, назначение и ограничения продукта.
- [DESIGN.md](DESIGN.md) — визуальная система, снятая с текущей реализации.
- [GEO-AUDIT-REPORT.md](GEO-AUDIT-REPORT.md) — датированный GEO-аудит и проверка статуса локальных рекомендаций.

Проект распространяется по лицензии MIT; подробности — в [LICENSE](LICENSE).
