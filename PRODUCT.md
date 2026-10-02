# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience today: privacy-conscious Android users and technically-inclined visitors who seek out native Android apps without telemetry or ads, and who value open-source/MIT-licensed code. The team's explicit goal is to reach a broader, more mainstream audience than the site currently attracts — this is a known, unresolved growth gap, not a settled fact about who the product serves. Visitors typically arrive to download a specific app (bit Hub) or to compare the apps in the ecosystem before downloading.

## Product Purpose

bit Tecnologies builds and distributes native Android applications (bit Hub, bit Delta, bit Record, bit Together, bit Launcher) with no telemetry and no ads. The site (this Astro project) is the marketing/distribution surface: it presents the app catalog, drives downloads (bit Hub release fetched live from GitHub), and explains the company's privacy stance. Success means visitors understand what each app does, trust the privacy claims, and download.

## Positioning

The company's stated differentiator is the ecosystem: bit Hub acts as the hub/launcher for a family of related apps (bit Delta, bit Record, bit Together, bit Launcher), not a single standalone app. Compared to other privacy-focused Android developers, bit Tecnologies competes on offering a connected suite rather than one-off tools — this is a claim a single-app competitor could not truthfully copy.

## Operating Context

- Site is built with Astro (static output) and Tailwind CSS v4. `astro.config.mjs` sets `https://bit-tecnologies.vercel.app` as the canonical site origin. A `wrangler.toml` for Cloudflare Pages is also present, so the repository alone does not establish which provider currently deploys production; check the deployment configuration before changing hosting.
- Bilingual: Russian (default, root paths) and English (`/en/*`), driven by `src/i18n`.
- Release metadata (version, size, download URL) for bit Hub is fetched during the static build from the `bit-Tecnologies/bit_hub` GitHub Releases API (`src/utils/github.ts`) and falls back to static copy when the fetch fails. A deployed static page does not refresh this data until it is rebuilt.
- App catalog entries carry a status per app: Beta (bit Hub, bit Delta), In development (bit Record, bit Together, bit Launcher).
- Dev command: `npm run dev` (astro dev).

## Capabilities and Constraints

- Apps are native Android (Kotlin, Jetpack Compose, Material Design per the About page); minimum SDKs range from Android 6.0/API 23 (bit Hub) to Android 7.0/API 24 (others).
- No telemetry, no ads, in all listed apps — this is a load-bearing claim across the site's proof points (hero, proof grid, compatibility section).
- Code is open source under MIT license.
- Some apps (bit Together) have no confirmed size/requirements yet (marked TBA) — do not fabricate specifics for unreleased apps.

## Evidence on Hand

- Real, live data: current bit Hub release version/size/download URL via GitHub API.
- Real compatibility table (per-app minimum Android version/API level).
- No testimonials, press, case studies, or user metrics exist on the site today — do not invent any.

## Product Principles

- Privacy and the "no telemetry, no ads" claim are the core trust signal and must stay literal, verifiable, and prominent — never soften into vague marketing language.
- The ecosystem/hub framing (bit Hub as gateway to the other apps) is the differentiator; work should reinforce the suite, not just the flagship app.
- Live, real data (release version/size) is preferred over static claims wherever the data pipeline already supports it.
- Growing beyond the current privacy/tech-enthusiast audience is an active, unresolved goal — new work may reasonably aim to broaden appeal, but should not claim mainstream traction that doesn't exist yet.
- Keep pace/weight honest: apps still in development or planning must be visibly marked as such, not glossed over.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web practice. Preserve existing accessibility behavior, including accessible theme and language controls.
