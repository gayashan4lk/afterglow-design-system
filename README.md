Afterglow is a dark-first editorial system for blogs, changelogs and engineering write-ups. A near-black page, bright headlines, soft grey prose, monospace metadata in capitals, and one glowing accent per story. Everything is neutral until the accent arrives, so the accent always means something.

## Principles

- **Reading comes first.** One column at `measure`, `body` at 17/28, generous space between paragraphs. Chrome stays quiet so the words don't compete with it.
- **One accent per page.** A post picks one hue (red by default) and uses it in at most four places: the status badge, the hero art, the active table-of-contents bar and callouts. Never two accents on one page.
- **Hairlines, not shadows.** Bands are separated by full-width `line` rules. Shadows exist only for things that float (`shadow-pop`) and for focus (`focus-ring`).
- **Mono for facts, sans for voice.** Dates, reading time, badges and breadcrumbs are set in `meta` or `label` (Geist Mono, capitals, tracked). Everything a person reads as language is Geist.

## Content fundamentals

- **Titles** are sentence case, without a trailing full stop. A colon splits a topic from its promise: "Faster releases: what changed in our pipeline". Keep them under about 70 characters.
- **Meta lines** are uppercase mono, with parts joined by a middle dot (` · `): `OCTOBER 18, 2026 · 4 MIN READ`. Write the month as a word; never write "4 minute read" or "4 mins".
- **Breadcrumbs** start with a left arrow: `← BACK TO CHANGELOG`.
- **Badges** are one or two words of status, uppercase: `NEW`, `UPDATED`, `BETA`, `DEPRECATED`, `RETIRED`.
- **Voice:**
  - Write "we" for the team and "you" for the reader.
  - Use plain verbs and short paragraphs (two to four sentences).
  - Don't use exclamation marks, emoji or hype words ("revolutionary", "game-changing").
- **Structure:**
  - Posts open with a `lead` paragraph that says what changed and who it affects.
  - The body uses `h2` sections, which feed the TOC.
  - Practical posts end with "What you need to do" (as an `h4`) and a short list.
- **Links** say where they go ("read the migration guide"), never "click here".

## Color

Dark is the primary theme and light mirrors it, so both must always work. Put `data-theme="dark"` or `data-theme="light"` on `<html>`, and follow `prefers-color-scheme` until the reader picks one.

**Neutrals**

- **Grounds:**
  - Use `canvas` as the page background everywhere.
  - Use `surface` for anything raised (cards, code blocks, callouts, inline code).
  - Use `surface-strong` only for hover or pressed states and table header rows.
- **Text tiers:** use exactly three, and never introduce a fourth grey.
  - `ink`: headlines and post titles, active nav links and the active TOC item.
  - `ink-body`: all article prose and lead paragraphs.
  - `ink-muted`: metadata, captions, inactive TOC items and footer links.
- **Lines:**
  - `line` is the hairline for band dividers and card or image borders. It is decorative.
  - `line-strong` borders any control a reader must find (inputs, outlined icon buttons, checkboxes), and holds 3:1.
- **Primary button:** an `inverse` fill (the brightest thing on the page) with an `on-inverse` label. Use one per view, at most.
- **Secondary button:** a 1px `ink` outline with an `ink` label, placed beside the primary.

**Links**

- Prose links are `link`, always underlined (1px, offset 3px), and turn `link-hover` on hover.
- Nav links aren't underlined; the active one is `ink` with a 2px underline.

**Accents.** There are five hues, each with four roles:

| Role | Token | Use |
|---|---|---|
| Mark | `red`, `orange`, `green`, `blue`, `purple` | TOC active bar, badge border, hero arc, small dots. Holds 3:1 on `canvas`. |
| Text | `red-ink` … | Badge label, callout title. Holds 4.5:1 on `canvas`, `surface` and its own `-soft`. |
| Fill | `red-soft` … | Badge and callout background, behind its `-ink`, `ink` or `link` text. |
| Glow | `red-glow` … | Hero-art gradient and grid. Never behind text. |

- **The `accent` aliases:**
  - Components never name a hue; they use `accent`, `accent-ink`, `accent-soft` and `accent-glow`, which point to red by default.
  - To recolour a post or a category page, wrap it in the `Accent` component, or set `data-accent="green"` on any element. `bundle.css` re-points the four tokens for everything inside.
- **Suggested category mapping:**
  - red: security, breaking changes, retirements.
  - orange: deprecations and upcoming changes.
  - green: releases and improvements.
  - blue: guides and docs.
  - purple: research, community and opinion.
- **Callouts** reuse the hues with fixed meanings:
  - Note: `blue`.
  - Tip: `green`.
  - Important: `purple`.
  - Warning: `orange`.
  - Caution: `red`.
- Every callout and badge also carries its word ("Warning", "Retired") and, for callouts, an icon. Hue alone never carries meaning.
- `blue` sits close to `link`, so never place an accent-blue mark right beside a link.

**Focus.** Every interactive element shows `focus-ring` on `:focus-visible`: a 2px gap in `canvas`, then a 2px solid ring in `focus`. It holds 3:1 on every surface, and it is never removed.

**Code.** Syntax colours are the `code-*` tokens, which alias the hue inks so they hold 4.5:1 on `surface` in both themes:

- `code-keyword` is red, `code-string` blue, `code-function` purple, `code-constant` orange, and `code-tag` (tags and properties) green.
- `code-comment` is `ink-muted`, in italics.
- `code-text` is `ink`.

## Typography

Set everything in **Geist** (`sans`) and **Geist Mono** (`mono`), both variable fonts in `fonts/` (SIL OFL, licence in `licenses/`). Load them only from those files; there is no third family.

- **Display:**
  - `title` (48/56, 600, −0.03em) for the post title on desktop, centred, in `ink`.
  - `title-sm` (34/40) below `bp-md` and on featured cards.
  - `display` (64/68) only for the blog's name on an index hero.
- **Headings:**
  - `h2` (30/38) for article sections.
  - `h3` (22/30) for sub-sections and card titles.
  - `h4` (18/26) for run-in headings like "Why this matters".
  - Headings are `ink`, sentence case and never skip a level.
- **Text:**
  - `lead` (20/32) for the first paragraph only.
  - `body` (17/28) for prose.
  - `body-sm` (15/24) for excerpts, TOC and footer.
  - `caption` (14/20) under figures, in `ink-muted`.
  - `ui` (16/24, 500) for nav, buttons and labels.
- **Meta:**
  - `meta` (13/20, mono, +0.06em) and `label` (12/16, mono 500, +0.08em) are always set with `text-transform: uppercase`.
  - `code` (14/22) for code blocks.
  - Inline code is `0.88em` mono on `surface` with `radius-sm` and 2px × 6px padding.
- **Emphasis:**
  - Use italic Geist for titles of works and gentle stress.
  - Use **600** for key terms.
  - Never underline for emphasis (underlines mean links).
- **Measure:** the prose column is `measure` (680px). Wide figures and tables may break out to `wide`.

## Layout

A post page is a stack of full-bleed bands separated by `line` hairlines:

1. **Site header** (`header-height`, sticky, `canvas` with a bottom `line`).
   - Left: the site name. Middle: nav in `ui`. Right: search, then up to two buttons (one `inverse`, one outlined).
2. **Breadcrumb row.** `← BACK TO …` in `meta`, `ink-muted`, at the container's left edge, with `space-6` vertical padding, inside `<nav aria-label="Breadcrumb">`.
3. **Post header**, centred.
   - Badge, then `space-4`, then the meta line, then `space-6`, then the `title`.
   - Top padding `space-24`; `space-12` below.
4. **Hero art** band, `hero-height` tall: the accent's grid-and-arc artwork, full-bleed.
5. **Body.**
   - The prose column at `measure` is centred in the container.
   - From `bp-lg`, the "On this page" rail (`toc-width`) sits to its right and sticks at `header-height` + `space-6`.
   - The left side stays empty, so the column reads centred, not pushed.
6. **Footer** above a `line`, with links in `body-sm` and `ink-muted`.

**Rhythm:**

- `space-6` between paragraphs, `space-12` above an `h2`, `space-8` above an `h3`, and `space-10` around figures.
- Lists indent `space-6`, with `space-3` between items and grey (`ink-muted`) bullets.

**Gutters:** `space-4` on phones and `space-8` from `bp-md`; the container caps at `container`.

**Index pages** use a featured card at `wide`, then a grid of post cards: one column, two from `bp-sm`, three from `bp-lg`, with gaps of `space-8`.

**Responsive:**

- Below `bp-md`, the nav collapses into a menu button and titles drop to `title-sm`.
- Below `bp-lg`, the TOC becomes a collapsible "On this page" row under the hero.

**Building pages:**

- `Container` lines every band up with the header.
- `ArticleBody` lays out the post body: the measure column plus the TOC rail.
- Three complete examples show the order and spacing to copy: the **Article page**, **Blog home page** and **Changelog page** (under Pages).
- Put each page's main content in `<main id="main">`, so the header's "Skip to content" link lands there.

## Spacing, radius, borders, shadows

- **Spacing:** a 4px scale (`space-1` to `space-24`). Use only these steps, never in-between values.
- **Radius:** mostly square-ish.
  - `radius-sm` (4px) for badges and inline code.
  - `radius-md` (6px) for buttons and inputs.
  - `radius-lg` (12px) for cards, code blocks, callouts and images.
  - `radius-full` for category tags and avatars.
- **Borders:** always 1px.
  - Cards are `surface` with a `line` border.
  - On hover, they move to `surface-strong` with no lift and no shadow.
- **Shadows:** `shadow-pop` for floating layers, `focus-ring` for focus. Nothing else casts a shadow.

## Imagery and hero art

- The hero art is the system's signature, drawn by the `HeroArt` component:
  - a square hairline grid in `accent-glow`, strongest near the top and fading into `canvas` at the bottom and sides;
  - a half-disc (`radius-full`) rising from the bottom edge, filled from `accent` at its rim down through `accent-glow` into `canvas`, inside a wider `accent-glow` halo;
  - one small `ink` spark on the disc's rim.
- It is abstract: no mascots, logos, faces or stock photos. The same artwork, recoloured by the post's accent, serves every post, so posts are told apart by title and colour.
- **In light theme**, the glow tokens become pale tints, so the art turns into a soft wash. Keep it.
- **Images in posts:**
  - `radius-lg` with a 1px `line` border, at `measure` (or `wide` for screenshots that need it).
  - A `caption` below, in `ink-muted`.
  - Always write alt text.
- **Screenshots of UI** get the border, so light screenshots don't bleed into `canvas`.

## Iconography

- Use **Lucide** outline icons (ISC licence) at 14px inside badges and meta lines, 16px in fields and small buttons, and 20px in buttons, nav and callouts.
- Draw them at a 1.75px stroke in `currentColor`, so they take the colour of their text token.
- Icons sit beside a word and never replace one, except search and the menu button, which carry an `aria-label`.
- Arrows in meta text are the characters `←` and `→`, set in `meta`.

## Motion

- Hover and focus changes take 150ms with `ease-out` (colour, underline, background).
- The TOC's active bar slides between items in 200ms.
- There is no parallax, scroll-jacking or animated hero. Under `prefers-reduced-motion`, all transitions are instant.

## Site name and logo

Afterglow ships no logo. Set the site name in Geist at 600, 20px, in `ink`, optionally followed by ` / Blog` in `ink-muted`. When a site has its own mark, place it left of the name at 24px and keep it single-ink.

## Accessibility

- **Contrast:**
  - Every text token's note names the grounds it is checked on.
  - Each pair holds at least 4.5:1 in both themes.
  - Marks, control borders and the focus ring hold at least 3:1.
- **Page structure:**
  - One `h1` per page: the post title.
  - Every piece of content sits in a landmark: header, the breadcrumb nav, `main` and the footer.
  - The first Tab stop is "Skip to content", which leads to `#main`.
  - The TOC is a `<nav aria-label="On this page">`, and its active item carries `aria-current="true"`.
  - Anchored headings get `scroll-margin-top: header-height + space-6`.
- **Status and hit areas:**
  - Badges and callouts always include their word, so status never relies on colour.
  - Targets are at least 40px tall in the header and 24px for inline controls.

## Using the components

- **Load order:** `tokens.css`, `components/bundle.css`, React 18 (`components/lib/`), then `components/bundle.js`.
- **What the bundle exposes:** `window.Afterglow`, with these components:
  - **Actions:** `Button`, `IconButton`, `Link`.
  - **Labels:** `Badge`, `Tag`, `MetaLine`.
  - **Primitives:** `Divider`, `Icon`, `Accent`.
  - **Navigation:** `SiteHeader`, `ThemeToggle`, `BackLink`, `TableOfContents`, `Pagination`, `SiteFooter`.
  - **Post:** `PostHeader`, `HeroArt`, `Prose`, `Callout`, `CodeBlock`, `AuthorByline` (with `Avatar`).
  - **Discovery:** `PostCard`, `PostGrid`, `SearchField`, `NewsletterSignup`.
  - **Layout:** `Container`, `ArticleBody`.
  - It also exposes `initTheme()` and the lists `HUES` and `ICON_NAMES`.
- **Theme on load:** call `Afterglow.initTheme()` (or inline its few lines in `<head>`) before first paint, so a returning reader gets their saved theme with no flash.
- **Responsive behaviour:** the header, post header, cards, grid, pagination, footer and newsletter respond to their own width (container queries), not the viewport's, so they work in any column. Only `HeroArt` and the `TableOfContents` rail follow viewport breakpoints.
- **Using it in your own code:**
  - The TSX sources are in `components/src/` and depend on React only, so a React or Next.js site can copy them instead of loading the bundle.
  - Every prop is documented in `components/index.d.ts`.
- **Class names:**
  - Component classes start with `ag-`.
  - Components also add the type-style classes from `tokens.css` (`ui`, `caption`, `label`, `meta`), so a change to a text style flows into them.
- **Accents:** wrap a post in `Accent` (or set `data-accent`), and every badge, bar and glow inside follows.
- **Page base:** `bundle.css` also gives `body` a quiet base (`canvas`, `ink-body`, Geist) at zero specificity, so a site's own rules win.
