# Changelog

All notable changes to Afterglow are recorded here, newest first. Versions follow semantic versioning:

- **Major (x.0.0):** a change that can break a site using the system, such as a renamed or removed token, or a component prop that changed or was removed.
- **Minor (1.x.0):** new tokens, components, variants or pages.
- **Patch (1.0.x):** fixes to values, styles or docs that keep every name and prop as it was.

## 1.0.0 — 2026-10-18

First release.

### Foundations

- **Themes:** dark (primary) and light.
- **Colour:** 44 tokens.
  - Neutrals: `canvas`, `surface`, `surface-strong`, `line`, `line-strong`, and the text tones `ink`, `ink-body` and `ink-muted`.
  - Links and focus: `link`, `link-hover` and `focus`.
  - The `inverse` / `on-inverse` pair for the primary button.
  - Five category accents (`red`, `orange`, `green`, `blue`, `purple`), each with `-ink`, `-soft` and `-glow` roles.
  - The `accent*` aliases.
  - Seven `code-*` syntax colours.
- **Contrast:** every text pair holds 4.5:1, and every mark, control border and focus ring holds 3:1, in both themes.
- **Fonts:** Geist and Geist Mono as variable fonts (SIL OFL), with 14 type styles in four groups: Display, Headings, Text and Meta.
- **Spacing, shape and layout:**
  - A 4px spacing scale (`space-1` to `space-24`).
  - Four radii: `radius-sm`, `radius-md`, `radius-lg` and `radius-full`.
  - Two shadows: `shadow-pop` and `focus-ring`.
  - Six layout widths: `measure`, `toc-width`, `wide`, `container`, `header-height` and `hero-height`.
  - Three breakpoints: `bp-sm`, `bp-md` and `bp-lg`.

### Components

React 18 components in `components/bundle.js` (`window.Afterglow`), with TSX sources in `components/src/` and types in `components/index.d.ts`.

- **Actions:** `Button`, `IconButton`, `Link`.
- **Labels:** `Badge`, `Tag`, `MetaLine`.
- **Primitives:** `Divider`, `Icon` (28 Lucide icons, ISC licence), `Accent`.
- **Navigation:**
  - `SiteHeader`, with a skip link and a menu below 768px.
  - `ThemeToggle` and `initTheme()`.
  - `BackLink`, `TableOfContents`, `Pagination`, `SiteFooter`.
- **Post:** `PostHeader`, `HeroArt`, `Prose`, `Callout`, `CodeBlock`, `AuthorByline` (with `Avatar`).
- **Discovery:** `PostCard` (default, featured and row variants), `PostGrid`, `SearchField`, `NewsletterSignup`.
- **Layout:** `Container`, `ArticleBody`.

### Pages

- Article page, Blog home page and Changelog page examples, built only from the components above.

### Accessibility

- **Automated check:** every preview and page was checked with axe-core against WCAG 2.2 AA and its best-practice rules, in both themes, with no violations.
- **Keyboard:** every Tab stop on the three pages shows a visible focus indicator.
