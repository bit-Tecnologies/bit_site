---
name: bit Tecnologies
description: Quiet, fact-led Android app ecosystem site with a signal-blue primary accent, light/dark themes, and selective glass surfaces
colors:
  canvas: "#f5f7fb"
  surface: "#ffffff"
  surface-muted: "#edf1f8"
  surface-elevated: "#ffffff"
  ink: "#0f172a"
  ink-strong: "#0b1020"
  ink-muted: "#5b6475"
  ink-soft: "#626c80"
  ink-faint: "#5f697c"
  line: "#dde3ee"
  signal-blue: "#1d4fd8"
  signal-blue-strong: "#1640b0"
  signal-blue-soft: "#e8f0ff"
  brand: "#2c6cff"
  success: "#138a56"
  success-soft: "#e4f5eb"
  on-accent: "#ffffff"
  info: "#2563eb"
  info-soft: "#e8f0ff"
  warning: "#d97706"
  warning-soft: "#fff3df"
  danger: "#dc2626"
  danger-soft: "#ffebeb"
  focus: "#2563eb"
  canvas-dark: "#0a0f1a"
  surface-dark: "#101726"
  surface-muted-dark: "#151d2f"
  ink-dark: "#f1f5fb"
  ink-muted-dark: "#aab5c8"
  line-dark: "#27324a"
  signal-blue-dark: "#7db0ff"
  info-dark: "#7db0ff"
  warning-dark: "#f5b65f"
  danger-dark: "#ff8f8f"
typography:
  display:
    fontFamily: "Sora, Manrope, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 6.7rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Manrope, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, Consolas, Monaco, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "0.16em"
rounded:
  sm: "0.45rem"
  md: "0.8rem"
  lg: "0.9rem"
  xl: "1rem"
  2xl: "1.6rem"
  3xl: "2rem"
  full: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.85rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue-strong}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.75rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.75rem"
  card-quiet:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
---

# Design System: bit Tecnologies

## Overview

**Creative North Star: "The Quiet Ledger"**

The site presents an Android app ecosystem through calm typography, readable product cards, and concrete product facts. Signal blue is the primary action and trust accent; green is reserved for the "live / working" status only. Status colors, product illustrations, and selected feature icons also use blue, violet, cyan, amber, and other semantic hues, so green is not the only saturated color in the implementation. Sora gives headings a geometric voice, Manrope carries body text, and IBM Plex Mono highlights compact technical details.

Depth combines translucent, blurred panels with flatter bordered cards. Glass styling appears in the navigation, homepage device snapshot, and panels across the product pages; quiet cards and tables carry much of the catalog and supporting content. Both light and dark palettes are implemented, with the initial theme following the user's saved choice or system preference.

Motion includes scroll reveals, small hover changes, and a pointer-following hero glow on supported devices. Reduced-motion preferences disable the relevant motion. The visual language stays quiet overall while allowing product-specific color and illustration where the interface already uses them.

**Key Characteristics:**
- Signal blue is the primary action accent; green appears only as the success/live status; semantic and product-specific colors also appear.
- Translucent glass panels and quiet bordered cards are both part of the current interface.
- IBM Plex Mono is used for compact product facts and metadata; use it sparingly in new content.
- Light/dark colors are defined in CSS custom properties, alongside existing Tailwind light/dark utilities.
- Motion is restrained: reveal-on-scroll, small hover lifts, no elaborate choreography.

## Colors

The core surfaces use ink, surface, and line neutrals with signal blue as the primary action accent. Semantic green (success/live), amber, and red colors support status and feedback; individual app and feature illustrations also introduce other hues.

### Primary
- **Signal Blue** (light `#1d4fd8`, dark `#7db0ff`; strong `#1640b0` / `#a8caff`; soft `#e8f0ff` / `#172944`; brand-fill `--brand` `#2c6cff` for text-free fills only): primary buttons, Beta chips, link hover, and other key actions. Other hues remain available for semantic status and product-specific illustrations.

### Neutral
- **Canvas** (`#f5f7fb` light / `#0a0f1a` dark): page background.
- **Surface** (`#ffffff` light / `#101726` dark): card and panel background.
- **Surface Muted** (`#edf1eb` light / `#151d2f` dark): recessed backgrounds (footer, secondary panels).
- **Ink** (`#0f172a` light / `#f1f5fb` dark): primary text.
- **Ink Muted** (`#5b6475` light / `#aab5c8` dark): secondary text, descriptions, metadata.
- **Ink Faint** (`#5f697c` light / `#8591a8` dark): tertiary text, disabled/least-important labels.
- **Line** (`#dde3ee` light / `#27324a` dark): all borders and dividers.

### Semantic
- **Info** (light `#2563eb`, dark `#7db0ff`): informational states and selected feature artwork.
- **Success** (light `#138a56`, dark `#65d99d`): only the live/working status (badge, status dots). Never a brand or decorative color.
- **Warning** (light `#d97706`, dark `#f5b65f`): caution and amber highlights.
- **Danger** (light `#dc2626`, dark `#ff8f8f`): error states.

### Named Rules
**The Primary Signal Rule.** Signal blue carries the main action and trust role. Green means only working/live; it is never a brand color. Semantic and product colors may support it. Keep glass surfaces selective, and use flatter cards for most catalog and reference content.

## Typography

**Display Font:** Sora (with Manrope, system-ui fallback)
**Body Font:** Manrope (with system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI' fallback)
**Label/Mono Font:** IBM Plex Mono (with Consolas, Monaco fallback)

**Character:** Geometric confidence paired with technical precision. Sora gives headlines a geometric, slightly futuristic weight; Manrope keeps body copy clean and easy to read at length; IBM Plex Mono marks anything that is a measured fact (version, size, API level) as deliberately engineered, not styled.

### Hierarchy
- **Display** (extrabold/800, `clamp(2.25rem, 6vw, 6.7rem)`, line-height 0.98, letter-spacing -0.055em): hero H1 only.
- **Headline** (extrabold/800, 1.875rem–3rem, tight tracking): section H2s.
- **Title** (extrabold/800, 1.125rem–1.25rem): card and component headings, font-display.
- **Body** (regular/light, 1rem–1.125rem, line-height 1.65): paragraphs and descriptions, font-sans (Manrope).
- **Label** (bold/700, 0.7rem–0.85rem, letter-spacing 0.12–0.2em, uppercase): eyebrows, status chips, spec values — font-mono (IBM Plex Mono).

### Named Rules
Use IBM Plex Mono mainly for compact values, version/size/API facts, and metadata. Keep paragraphs and prominent headings in the sans/display families.

## Layout

Containers are centered with responsive horizontal padding. Sections use generous vertical spacing, and the homepage hero adds extra top padding to clear the fixed floating navigation. Layouts progress from stacked mobile content to two- and multi-column grids at wider breakpoints.

Grids favor asymmetric, content-driven ratios over even columns: the hero is `lg:grid-cols-[1.02fr_0.98fr]`, the compatibility section is `lg:grid-cols-2`, the advantages section is `lg:grid-cols-[0.88fr_1.12fr]`. The app catalog scales from 1 column (mobile) to 5 (`xl:grid-cols-5`) as a dense, scannable grid rather than a fixed 3-column layout.

The header is a floating, pill-like nav (`.quiet-nav`, fixed with top offset, not full-bleed) — it does not span edge-to-edge like a conventional sticky header.

## Elevation & Depth

Deliberate two-tier hybrid, not a single elevation model.

**Glass surfaces**: translucent backgrounds, blur, subtle gradient/highlight layers, and low-contrast borders. Used by the floating navigation, homepage snapshot, and product-page panels.

**Quiet surfaces**: solid or tonal backgrounds with a `var(--line)` border and restrained shadow or hover lift. Used by app cards, specification tables, proof grids, and other content blocks.

### Shadow Vocabulary
- **Ambient glass** (`0 18px 60px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.85)`): liquid-tier surfaces only.
- **Quiet utility** (`0 8px 24px var(--shadow-color)` / `0 12–18px 30–40px var(--shadow-color)`): nav pill, snapshot card, CTA panel — a grounding hint, not a spotlight.
- **Glow accents** (`0 0 40px rgba(accent, .15), 0 0 80px rgba(accent, .05)`): reserved, sparing use around interactive glow states (`.glow-emerald` etc.); not part of default card treatment.

### Named Rules
**The Flat-By-Default Rule.** Ordinary content surfaces (`quiet-*`) are flat with a hairline border at rest; blur and heavy ambient shadow are earned only by hero/showcase elements.

## Shapes

Soft-geometric, not sharp and not pill-heavy. Standard card/button radius sits around 0.7–0.9rem (`rounded-[0.8rem]` buttons, `.9rem`–`1rem` cards); larger showcase surfaces (hero snapshot, liquid panels) scale up to 1.6–2.25rem. Full-round (`999px`/`rounded-full`) is reserved for status dots, pills (nav CTA is an exception at `.65rem`), and chip-shaped elements. Borders are consistently 1px and use `var(--line)`; there is no double-border or outline-plus-shadow layering.

## Components

### Buttons
- **Shape:** `rounded-[0.8rem]` (~0.8rem), min-height 44px for touch targets.
- **Primary:** solid `var(--accent)` fill, `var(--on-accent)` text; hover darkens to `var(--accent-strong)` with a −0.5px translate-y lift; active returns to baseline.
- **Secondary:** `var(--surface)` fill with a `var(--line)` border; hover shifts border to accent and background to `var(--surface-muted)`.
- **Outline:** transparent fill, `var(--line)` border; hover shifts border and text to accent.
- **Ghost:** no border/fill, `var(--ink-muted)` text; hover shifts to accent, subtle active scale (0.98).

### Cards / Containers (`.quiet-card`)
- **Corner Style:** `.9rem` radius.
- **Background:** `var(--surface)`, flat, no blur.
- **Border:** 1px `var(--line)`; hover shifts to accent with a −3px translate-y lift.
- **Featured variant:** border blends toward accent at rest (`color-mix(accent 55%, line)`) to mark the flagship product.
- **Internal Padding:** `1.25–1.5rem` (`p-5 sm:p-6`).

### Liquid Surfaces (`.liquid-panel`, `.liquid-card`, `.quiet-snapshot`)
- **Corner Style:** 1–2.25rem depending on role (snapshot 1rem, panel/strip/cta 2.25rem).
- **Background:** layered translucent gradient + backdrop blur; a soft top-left highlight gradient overlay (`::before`) simulates glass sheen.
- **Border:** 1px near-white/near-black hairline at low opacity.
- **Use sparingly:** hero device mock, floating nav, CTA band only.

### Status Chips / Badges
- **Style:** small rounded-md pill or chip, uppercase mono-adjacent label, tinted background matching semantic color at low opacity (e.g. `bg-emerald-50 text-emerald-800` for Beta, neutral slate for other states).
- **Placement:** directly under a title, never floating unanchored.

### Navigation
- **Style:** floating pill nav (`.quiet-nav`), not full-bleed; fixed with top offset, translucent canvas-tinted background with blur.
- **Links:** `var(--ink-muted)` at rest, bold 700, shifts to `var(--accent-strong)` on hover — no underline.
- **CTA:** solid accent pill button (`.quiet-nav-cta`), distinct from plain nav links.
- **Mobile:** slides down as a bordered `quiet-mobile-menu` panel; link rows separated by hairline dividers.

### Inputs / Fields
No form inputs exist in the current implementation — omit until a real field is built rather than inventing a style.

## Do's and Don'ts

### Do:
- **Do** use Signal Blue (`--accent`) for primary actions while preserving semantic colors and existing product-specific accents.
- **Do** use IBM Plex Mono for compact technical values; keep longer copy in the body font.
- **Do** use glass panels selectively and quiet bordered cards for most catalog and information content.
- **Do** use the CSS theme tokens where available, while recognizing that existing components also use Tailwind color utilities.
- **Do** keep hover feedback small and respect `prefers-reduced-motion`.
- **Do** mark unreleased or in-progress apps honestly (Beta / In development / Planning / TBA) rather than presenting them as shipped.

### Don't:
- **Don't** add busy dashboard decoration or motion that competes with product information.
- **Don't** mix glass and flat treatment on the same element (no blurred card with a hard flat border, no flat card with backdrop blur).
- **Don't** let additional accents displace signal blue as the primary action color; never place text on `--brand` (#2c6cff, 4.47:1 with white); never use green outside the success/live status.
- **Don't** use heavy motion; keep movement purposeful and respect `prefers-reduced-motion`.
- **Don't** fabricate specifics (size, requirements) for apps still marked TBA/Planning.
