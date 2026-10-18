# PostHeader

The top of a post: status badge, meta line and the big title, centred, with an optional one-sentence summary and byline.

**Anatomy** — badge, `space-4`, `MetaLine` (centred), `space-6`, title in `title` (`title-sm` below 768px of its own width), then optional `dek` in `lead` `ink-body` at `measure`, then children (usually an `AuthorByline`). Padding `space-24` above and `space-12` below (`space-16` / `space-10` when narrow). Max width 880px; the title wraps balanced.

**What you provide** — `title` (sentence case, under ~70 characters); optional `badge` (a string becomes a `Badge` in the page accent), `meta` (`MetaLine` items: date first, then reading time), `dek`, `align` (`center` default for posts, `start` for category and index headers), `titleAs` (`h1` by default — one per page) and `children`.

**Do / don't**
- Do wrap the whole post in `Accent` so the badge here matches the hero art and TOC bar.
- Do follow it directly with a full-bleed `HeroArt`.
- Don't add a second badge or stack tags here; categories belong on cards and in the meta line.
