# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience: users who want a set of useful, well-made apps from one developer. Users are on Android and on desktop. All apps are distributed through bit Hub, so bit Hub is the single entry point for every platform. Today only the Android builds are confirmed and downloadable. Technically-inclined and open-source-minded visitors are part of the audience, not all of it. The team's explicit goal is a broader, more mainstream audience — an unresolved growth gap, not a settled fact. Visitors typically arrive to download a specific app (bit Hub) or to compare the apps in the ecosystem before downloading.

## Product Purpose

bit Tecnologies builds and distributes applications (bit Hub, bit Delta, bit Record, bit Together, bit Launcher) that work together as one ecosystem. The company targets Android and desktop: Android is where the current apps ship, not the brand's boundary. Every app is distributed through bit Hub. The site (this Astro project) is the marketing/distribution surface: it presents the app catalog, drives downloads (bit Hub release fetched live from GitHub), and explains what each app does. Success means visitors understand what each app does, see how the apps fit together, and download.

## Positioning

The differentiator is the ecosystem: bit Hub is the entry point to a family of related apps (bit Delta, bit Record, bit Together, bit Launcher), not a single standalone app. The pitch is "products that work together and complement each other" — a connected suite a single-app competitor could not copy.

Privacy and native implementation are NOT the site's headline goal or main positioning. They may appear as facts about a specific app where they are true and verified, but the site must not be built around "no tracking / native" as its core message, and must not claim them ecosystem-wide. Lead with what the apps do and how they connect.

## Operating Context

- Site is built with Astro (static output) and Tailwind CSS v4. `astro.config.mjs` sets `https://bit-tecnologies.vercel.app` as the canonical site origin. Deployment is done by Vercel's own Git integration; GitHub Actions (`.github/workflows/ci.yml`) only runs checks (type check, ESLint, build) and does not deploy.
- Bilingual: Russian (default, root paths) and English (`/en/*`), driven by `src/i18n`.
- Release metadata (version, size, download URL) for bit Hub and bit Delta is fetched during the static build from the `bit-Tecnologies/bit_hub` GitHub Releases API (`src/utils/github.ts`) and falls back to static copy when the fetch fails. A deployed static page does not refresh this data until it is rebuilt.
- App catalog entries carry a status per app: Beta (Android bit Hub, bit Delta), In development (bit Record, bit Together, bit Launcher, desktop bit Hub for Windows); Linux desktop is planned.
- Dev command: `npm run dev` (astro dev).

## Capabilities and Constraints

- Platforms are Android and desktop; all apps are distributed through bit Hub (stated by the team). Confirmed state:
  - Android: bit Hub (beta), bit Delta (beta) are the downloadable builds; bit Record and bit Launcher are in development.
  - Desktop bit Hub: separate repo `bit_hub_desktop` (local `C:/dev_C/BIT_TECNOLOGIES/bit_hub_desktop`), built with Tauri 2 + Rust + Svelte, version 0.0.1, `Cargo.toml` declares MIT. **Windows: in development. Linux: planned only.** macOS is not mentioned anywhere — do not claim it.
  - bit Together: Flutter, currently in development on Windows; mobile (Android) status unconfirmed.
  - Do not name desktop sizes, versions, minimum OS versions or download links until a desktop release exists. Show Windows as "in development" and Linux as "planned". Do not frame bit Tecnologies as an "Android developer" or the ecosystem as "Android apps" in headlines, badges, titles, schema or `llms.txt`; state platform per app (e.g. "Android 7.0+"). Do not claim iOS or web.
- Tech stacks differ and must be stated per app: Android bit Hub/Delta/Record/Launcher are Kotlin + Jetpack Compose; desktop bit Hub is Tauri/Rust/Svelte (a web-UI shell, not a native toolkit); **bit Together is Flutter**. Do not use "native" as an ecosystem-wide claim, and never describe desktop bit Hub or bit Together as native/Kotlin/Compose.
- Android minimum SDKs: Android 6.0/API 23 (bit Hub), Android 7.0/API 24 (bit Delta, bit Record, bit Launcher). bit Together requirements are unconfirmed (TBA) — do not fabricate specifics for unreleased apps, including sizes.
- Source/license facts (verified on GitHub, 2026-10-02): of 9 repositories in `github.com/bit-Tecnologies`, only `bit_site`, `bit_hub`, `bit_delta` and `.github` are public. `bit_together`, `bit_together-relay`, `bit_hub_desktop`, `bithub_python`, `bit_lifepath` are private. Only `bit_site` has a LICENSE file (MIT); `bit_hub` and `bit_delta` have none (the bit_hub README shows an MIT badge, the site's Hub page said GPLv3; neither is backed by a file), desktop bit Hub declares MIT in `Cargo.toml` but is private. **Never claim "all code is open source" or "everything is MIT".** Say only that the bit Hub and bit Delta repositories are public on GitHub, until licenses are settled. No repositories exist for bit Record or bit Launcher.
- bit Hub (Android) is backed by Supabase (the app catalog lives in the cloud) and downloads APKs from GitHub Releases; do not describe it as serverless or fully local. The site no longer makes ecosystem-wide "no telemetry / no trackers / private" claims. The privacy policy (rewritten 2026-10-02 from the code) states only verified per-app facts: bit Hub has no analytics/ad SDKs and only reads the catalog from Supabase and releases from GitHub; bit Delta requests no INTERNET permission; the website loads Google Fonts and fetches GitHub release data in the browser. Re-verify against the code and update the policy date whenever an app's behavior or permissions change, and add each new app (Record, Launcher, Together, desktop Hub) to the policy before it ships. Do not reintroduce blanket privacy or telemetry slogans.
- Release facts: Android bit Hub and bit Delta releases on GitHub are marked pre-release/alpha (latest Hub `v0.0.2.7alpha`, ~3.0 MB; Delta `v0.0.1.1alpha`, ~1.4 MB). bit Record has no published build or size — show none.
- bit Together (private repo): cross-platform Flutter messenger with E2E encryption through its own relay server; project folders cover android, ios, linux, macos, web, windows, but only Windows is the stated focus. Per its own architecture doc the screens are still placeholders, there are no releases, and the relay deploy is not live. Do not describe it as shipped.

## Evidence on Hand

- Real, live data: current bit Hub release version/size/download URL via GitHub API.
- Real compatibility table (per-app minimum Android version/API level).
- No testimonials, press, case studies, or user metrics exist on the site today — do not invent any.

## Product Principles

- The ecosystem framing (bit Hub as the single gateway to all apps on every platform, apps that complement each other) is the main message; work should reinforce the suite, not just the flagship app.
- Any claim (privacy, ads, license, tech stack) must be literal, verifiable and app-specific. If it cannot be verified for an app, leave it out rather than generalize.
- Live, real data (release version/size) is preferred over static claims wherever the data pipeline already supports it.
- Growing beyond the current tech-enthusiast audience is an active goal — new work may aim to broaden appeal, but should not claim mainstream traction that doesn't exist yet.
- Keep pace/weight honest: apps still in development or planning must be visibly marked as such, not glossed over.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web practice. Preserve existing accessibility behavior, including accessible theme and language controls.
