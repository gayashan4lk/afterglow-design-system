# MetaLine

Facts about a post — date, reading time, author, last update — in mono capitals, joined by middle dots.

**Anatomy** — `meta` type (Geist Mono 13/20, +0.06em) in capitals; `ink-muted`; `space-2` gaps around each `·`; items wrap on narrow screens.

**What you provide** — `items`, in this order: date, reading time, then author or anything else. Each item is text or an object `{ label, dateTime?, href?, icon? }`: `dateTime` renders a `<time>` (always give one for dates), `href` makes the item a quiet link, `icon` adds a 14px icon. `align="center"` for the post header; `as="p"` when it stands alone.

**Writing** — months as words ("October 18, 2026"), "4 min read", team or author names as written. The capitals come from CSS, so write items in normal case (screen readers then read them as words).

**Do / don't**
- Do place it between the badge and the title in a post header (`space-4` above, `space-6` below), and under the title on post cards.
- Don't put more than four facts in one line.
- Don't use it for sentences or links that need to stand out.
