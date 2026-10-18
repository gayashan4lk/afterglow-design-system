# SiteHeader

The site's top bar: name on the left, navigation beside it, then search, the theme switch and up to two buttons on the right; below 768px of its own width everything but the name folds into a menu button.

**Anatomy** — `header-height` tall, `canvas` with a bottom `line`, content capped at `container` with `space-4` gutters (`space-8` from 768px). Site name in Geist 600 at 20px in `ink`, the optional section ("/ Blog") in `ink-muted`. Nav is `Link variant="nav"`; buttons are `Button` (`secondary` then `primary`, rightmost).

**What you provide**
- `siteName` (required) and optional `section`, `homeHref`, `logo` (a single-ink 24px mark).
- `nav` — `{ label, href, current }[]`; mark the page you're on with `current`.
- `primaryAction` / `secondaryAction` — `{ label, href | onClick }`. One primary at most.
- `onSearch` — shows the search icon button; open your search dialog from it.
- `themeToggle` (default `true`) and `sticky` (default `true`).
- `skipHref` (default `#main`) — the first Tab stop is a "Skip to content" link to your `<main id="main">`; `false` leaves it out.

**Behaviour** — the menu button sets `aria-expanded` and reveals a panel with the same nav and buttons under the bar. The switch to the menu happens by the header's own width (a container query), so it also works inside narrow previews. Between 768 and 1023px the secondary button is hidden to make room; the nav stays.

**Do / don't**
- Do keep nav to three to five items; put the rest in the footer.
- Don't put the accent colour in the header — it stays neutral on every page.
