# Tag

A category pill — a hue dot and a name — used as a link to the category, a filter chip on index pages, or a plain label on a card.

**Anatomy** — `caption` type at 500; 28px tall; `radius-full`; `surface` fill with a `line` border; `ink-body` text; an 8px dot in the category's hue.

**What you provide** — the category name as children (sentence case); `hue` for the dot (match the category mapping in the brand book: red security, orange deprecations, green releases, blue guides, purple community); then one of:
- `href` → a link to the category page (`aria-current="page"` when `selected`);
- `onClick` → a filter chip button (`aria-pressed` reflects `selected`);
- neither → a plain label.

Optional `count` shows the number of posts in mono after the name.

**States** — interactive tags take `surface-strong` with a `line-strong` border on hover; `selected` fills with `inverse` and an `on-inverse` label.

**Do / don't**
- Do put a filter row of tags above a post grid, with an "All" tag first.
- Don't put more than three tags on a card.
- Don't use a tag for status — that's a `Badge`.
