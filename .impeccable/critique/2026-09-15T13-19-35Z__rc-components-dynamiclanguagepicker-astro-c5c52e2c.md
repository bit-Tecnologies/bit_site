---
target: theme + language switcher buttons
total_score: 18
max_score: 28
na_heuristics: 7,9,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\dev_C\\BIT_TECNOLOGIES\\bit_site\\src\\components\\ThemeToggle.astro,src\\components\\DynamicLanguagePicker.astro"
timestamp: 2026-09-15T13-19-35Z
slug: rc-components-dynamiclanguagepicker-astro-c5c52e2c
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Theme toggle cross-fades icon + `aria-pressed`; language button gives no visible "active" feedback until the page's text actually re-renders |
| 2 | Match System / Real World | 2 | Sun/moon and globe+code are standard conventions; nothing exceptional |
| 3 | User Control and Freedom | 3 | Both are simple, undo-able toggles; no lock-in |
| 4 | Consistency and Standards | 2 | CSS defines a `.quiet-control-menu`/`.lang-option` dropdown pattern that the markup never implements — component and stylesheet disagree on the interaction model |
| 5 | Error Prevention | 3 | Low-risk toggles, little to prevent |
| 6 | Recognition Rather Than Recall | 2 | Icon-only buttons rely on the user already knowing sun/moon/globe conventions; no visible hint of *which* language you'll get |
| 7 | Flexibility and Efficiency | n/a | Not applicable to a 2-state toggle |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and unobtrusive, but reads as unfinished given the dead dropdown affordance |
| 9 | Error Recovery | n/a | No error states possible in this control |
| 10 | Help and Documentation | n/a | Not applicable to a micro-interaction |
| **Total** | | **18/28** | **Acceptable (64%)** |

*(Heuristics 7, 9, 10 scored n/a — genuinely inapplicable to a two-button micro-interaction. Max renormalized to 28.)*

## Design Specificity Verdict

**Design review**: These two controls are stock Tailwind icon-button boilerplate — a standard sun/moon SVG pair and a standard globe+code combo. Nothing about their shape, motion, or spacing signals "bit Tecnologies" specifically; they'd drop unchanged into any SaaS header. The one genuinely authored touch is the icon cross-fade transition on the theme toggle.

**Deterministic scan**: The bundled Impeccable detector ran clean against `ThemeToggle.astro`, `DynamicLanguagePicker.astro`, and `Header.astro` — exit code 0, zero findings. No false positives to reconcile, but also nothing to corroborate; the real issues here are semantic/interaction bugs a mechanical scanner isn't built to catch (dead CSS, fragile state derivation, unreachable dependency), so the clean scan should not be read as "these controls are fine."

**Visual overlays**: Not available — no browser automation tool was exposed to the detector sub-agent, so no live overlay was injected. This is a fallback-signal gap, not a finding.

## Overall Impression

Both buttons work and share a token-level visual language (`.quiet-control`), but the language switcher is the weaker of the pair: its accessible name is redundant, its "current language" detection is a coincidence rather than a fact, and the CSS ships styling for a dropdown menu (`.quiet-control-menu`, `.lang-option`) that no component in the codebase renders. The biggest opportunity is deciding, once, whether this is meant to be a binary toggle (as coded today) or a language *menu* (as styled today) — right now it's neither cleanly.

## What's Working

- **Theme icon cross-fade** (`ThemeToggle.astro:11-12`): opacity + scale + blur over 300ms is a genuinely nice, restrained micro-interaction, better than a flat icon swap.
- **Shared `.quiet-control` sizing recipe** (`global.css:722,729-730`): both buttons get the same 2.75rem box, border, hover, and focus-visible treatment, so they read as a pair at a glance.
- **Sub-380px mobile override** (`global.css:832-836`): collapsing the language text and tightening padding under very narrow viewports shows real attention to small screens, not just a generic breakpoint.

## Priority Issues

**[P0] Dead dropdown CSS with no corresponding markup**
- **Why it matters**: `.quiet-control-menu` and `.lang-option` (`global.css:731-734`) style a listbox/menu pattern that `DynamicLanguagePicker.astro` never renders. Either a feature shipped half-built or leftover CSS survived its removal — either way it signals the component is unfinished, and misleads anyone reading the CSS about how the control actually behaves.
- **Fix**: Either implement the real menu (`role="listbox"`/`role="option"` markup, so more than two languages can be supported later) or delete the dead selectors.
- **Suggested command**: `/impeccable harden`

**[P1] Language detection derived by coincidence, not fact**
- **Why it matters**: `DynamicLanguagePicker.astro:28` — `document.documentElement.lang === 'en' ? 'en' : 'ru'` collapses *any* non-`'en'` value (wrong case, a future third locale, or a timing gap before `lang` is set) into `'ru'`. It only "works" today because there are exactly two lowercase locales.
- **Fix**: Read the current language from a single reliable source — the `data-initial-lang` attribute already present on the container, or the i18n client's own state — instead of re-deriving it from `documentElement.lang` with a binary fallback.
- **Suggested command**: `/impeccable harden`

**[P1] Redundant, non-informative accessible name**
- **Why it matters**: `aria-label="Change language"` on the button (`DynamicLanguagePicker.astro:11-13`) is duplicated by an `sr-only` span with identical text — the span is inert since the `aria-label` wins. Worse, "Change language" tells a screen-reader user nothing about which language they're on or switching to, which is less informative than the sighted UI's visible "EN"/"RU".
- **Fix**: Make the accessible name dynamic (e.g. `aria-label={"Change language (currently " + lang.toUpperCase() + ")"}`) and drop the redundant `sr-only` span.
- **Suggested command**: `/impeccable clarify`

**[P2] Hardcoded `aria-pressed="false"` before JS runs**
- **Why it matters**: `ThemeToggle.astro:9` sets `aria-pressed="false"` in markup. If JS loads late or fails, a screen reader can announce "not pressed" while dark mode is actually active via system preference.
- **Fix**: Default to `aria-pressed={undefined}` in markup and ensure `syncThemeToggle()` runs before first paint/announcement where possible.
- **Suggested command**: `/impeccable harden`

**[P3] No hover tooltip on the language button**
- **Why it matters**: The theme toggle has a native `title` tooltip; `DynamicLanguagePicker.astro` has none, so mouse users get no hover hint beyond the static text — inconsistent with its paired control.
- **Fix**: Add a `title` attribute mirroring the (now-dynamic) `aria-label`.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

**Jordan (First-Timer)**: Sees a bare globe icon + "EN" with no chevron or menu affordance, but the app's own visual language elsewhere implies a dropdown exists (`.quiet-control-menu` styling). Likely expects a menu to open; instead the click silently flips straight to Russian — a jarring, unexpected first interaction.

**Sam (Accessibility-Dependent User)**: Hears "Change language" with no indication of current or target state, and gets no signal that only two languages exist. If a listbox pattern were expected (as the CSS implies), it silently isn't there for assistive tech either.

## Minor Observations

- `ThemeToggle.astro`'s icon uses Tailwind's `w-5 h-5` while `global.css` independently redeclares `1.25rem` sizing on the same elements — two sources of truth for one size, easy to drift.
- `.language-control` (`global.css:723`) uses `min-width` + horizontal padding rather than the theme button's fixed square box, so despite sharing `.quiet-control` the two buttons aren't actually the same shape — a reasonable choice given the text content, but it undercuts the "matched pair" impression on close inspection.
- `ThemeToggle`'s rebind strategy (`.onclick =` overwrite) and `Header.astro`'s mobile-menu rebind strategy (`cloneNode` + `replaceChild`) solve the same Astro view-transition re-binding problem two different ways in adjacent files — not currently broken, but an inconsistent pattern to carry forward.
- `window.setLanguage` (called via optional chaining in `DynamicLanguagePicker.astro:29`) is defined in `src/i18n/client.ts` but never imported by name anywhere near the picker — the dependency is real but implicit; if that script ever fails to load, the click silently no-ops.

## Questions to Consider

- If the language switcher is meant to stay a simple binary toggle, does the app's design language elsewhere need to stop implying a dropdown exists?
- What happens the day a third language is added — does this binary toggle get replaced, or extended awkwardly?
- Would a confident version of the language control show the *target* language on hover, not just the current one?
