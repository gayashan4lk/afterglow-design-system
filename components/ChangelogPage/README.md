# Changelog page

A dated list of every change: a left-aligned header, status filters, then rows with a date column, a badge and a one-line summary.

**Order, top to bottom**
1. `SiteHeader` with "Changelog" current.
2. `<main id="main">`:
   - `PostHeader` with `align="start"`: title "Changelog", a `dek`, and as children a small `SearchField` and an RSS `Button` (ghost, `rss` icon).
   - Filters — `Tag` chips for the statuses (All, New, Improved, Deprecated, Retired), `space-8` below.
   - `PostGrid layout="list"` of `row` `PostCard`s, newest first; a row's badge takes the row's hue, so give each row the hue of its status (NEW green, IMPROVED blue, DEPRECATED orange, RETIRED red) through `category.hue`.
   - `Pagination`, `space-16` above, `space-24` below.
3. `SiteFooter`.

**Rules** — no hero art on the list; colour comes only from badges. Keep summaries to one sentence.
