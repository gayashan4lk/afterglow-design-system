# Badge

One or two words of status — RETIRED, NEW, BETA — in mono capitals on the accent's tint, sitting above a post title or beside a card's meta.

**Anatomy** — `label` type in capitals; `accent-ink` text on `accent-soft` with a 1px `accent` border; `radius-sm`; 3px × `space-2` padding.

**What you provide** — the word(s) as children; optional `hue`:
- `accent` (default) — follows the page's accent, so a badge inside `<Accent hue="green">` turns green. Use this on post pages.
- a hue (`red`, `orange`, `green`, `blue`, `purple`) — pins the colour where the meaning is fixed, e.g. a changelog list mixing NEW and DEPRECATED.
- `neutral` — `ink-muted` on `surface` with a `line-strong` border, for DRAFT and internal states.

Optional `icon` (14px) before the word.

**Suggested words and hues** — NEW / IMPROVED (`green`), UPDATED / GUIDE (`blue`), BETA / PREVIEW (`purple`), DEPRECATED / UPCOMING (`orange`), BREAKING / RETIRED / SECURITY (`red`).

**Do / don't**
- Do keep it to one badge per post header.
- Don't write sentences in a badge or use it as a button; it's a label.
- The word carries the meaning; never rely on the colour alone.
