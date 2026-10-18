# ArticleBody

The post body grid: the article centred at `measure`, with "On this page" as a sticky rail to its right from 1100px, and as a collapsible row above the article below that.

**Anatomy** — from 1100px of viewport, three columns: an empty left column, the `measure` column and a `toc-width` rail, with `space-12` between them; the rail sticks at `header-height` + `space-6` for the whole length of the article. Padding `space-16` above and `space-24` below (`space-12` / `space-16` on phones).

**What you provide** — `toc` (`TocItem[]`, the article's `h2`s; omit for short posts) and optional `tocTitle`; children are the article, normally a `Prose`, followed by anything that belongs to it (a `NewsletterSignup`).

**Do / don't**
- Do place it directly after the `HeroArt` band, inside `<main id="main">`.
- Do give every `h2` an `id` that matches its TOC item.
- Don't put the TOC on the left or the article off-centre; the empty left column is what keeps the text centred under the title.
