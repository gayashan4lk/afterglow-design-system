# Blog home page

The blog's front page: its name, a search box, category filters, a featured post over a grid of cards, page numbers and the newsletter.

**Order, top to bottom**
1. `SiteHeader` with "Blog" current.
2. `<main id="main">`:
   - Intro — a `Container`: the blog name as an `h1` in `display`, one `lead` sentence in `ink-body`, and a `SearchField` beside them from 768px (below on phones). `space-24` above, `space-12` below.
   - Filters — a row of `Tag` chips ("All" first, each category with its hue), `space-8` below.
   - `PostGrid`: one `featured` `PostCard`, then default cards, newest first; headings at level 2.
   - `Pagination`, `space-16` above.
   - `NewsletterSignup` in a `Container`, `space-16` above and `space-24` below.
3. `SiteFooter`.

**Rules** — the page itself has no accent; every card carries its own category's. The `display` style appears here and nowhere else.
