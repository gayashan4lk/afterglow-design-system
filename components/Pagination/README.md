# Pagination

Moves through pages of posts: "Newer posts" and "Older posts" on the ends, page numbers between; when its own width drops below 560px the numbers give way to "Page 3 of 12".

**Anatomy** — the ends are ghost `Button`s with arrows (disabled at the first and last page). Numbers are 40px mono targets in `ink-body`; the current page is `ink` on `surface` with a `line-strong` border and `aria-current="page"`. Long runs collapse to `1 … 4 5 6 … 12`.

**What you provide** — `page` (1-based, page 1 = newest) and `pageCount`; then `hrefFor(page)` to render real links (static sites, SEO) or `onPageChange(page)` for client-side paging. Optional `prevLabel` / `nextLabel`.

**Do / don't**
- Do put it under the post grid, `space-16` below the last card, full container width.
- Do prefer links (`hrefFor`) so every page has a URL.
- Don't combine it with infinite scroll.
