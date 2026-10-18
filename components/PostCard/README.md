# PostCard

A post in a list — category, title, excerpt, meta — where the whole card is one link and its category's hue colours the tag dot, badge and art.

**Variants**
- `default` — `surface` card, `line` border, `radius-lg`, `space-6` padding. Category `Tag` and optional `Badge`, title in `h3`, excerpt in `body-sm`, then a footer with an `AuthorByline` (`sm`) and a `MetaLine`. Set `art` to put a 160px `HeroArt` (or the post's image) on top.
- `featured` — the newest or most important post, spanning the grid. Art and text side by side from 720px of its own width (stacked below), title in `title-sm`, excerpt in `lead`.
- `row` — for changelogs: no box, a hairline below, the date in its own 176px column, then badge and category, title in `h4` and excerpt.

**Behaviour** — the title link stretches over the whole card (one tab stop, one link); hover moves the card to `surface-strong` and underlines the title; keyboard focus draws `focus-ring` around the card. The card wraps itself in `data-accent` from `category.hue`.

**What you provide** — `post`: `{ href, title, excerpt?, date?: { label, dateTime }, readingTime?, category?: { label, hue? }, badge?, image?: { src, alt }, authors? }`; `variant`; `art`; `headingLevel` (3 by default, 2 when the cards are the page's main list).

**Do / don't**
- Do keep excerpts to one or two sentences; the card doesn't clamp them.
- Don't put other links or buttons inside a card — the whole card is the link.
- Use `PostGrid` to lay cards out.
