# Article page

A complete post, assembled only from Afterglow components. Use it as the template for every article.

**Order, top to bottom**
1. `SiteHeader` (sticky) — `skipHref="#main"` lands keyboard users on the post.
2. Breadcrumb band — `<nav aria-label="Breadcrumb">` holding a `Container` with `BackLink`, `space-6` padding, `line` below.
3. `<main id="main">` wrapped in `Accent` with the post's category hue:
   - `PostHeader` — badge, meta, title, dek, `AuthorByline`.
   - `HeroArt` (`md`).
   - `ArticleBody` with the `toc` — `Prose` (lead on), then a `NewsletterSignup` `space-16` below it.
4. Related posts — a `Container` with an `h2` in `ink` and a `PostGrid` of three cards, `space-16` above and `space-24` below, `line` above.
5. `SiteFooter`.

**Rules** — one `h1` (the title); one accent for everything inside `main`; related cards keep their own category colours.
