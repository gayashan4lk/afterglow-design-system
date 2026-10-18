# TableOfContents

"On this page": the article's sections as a sticky rail beside the text, with a 2px `accent` bar that slides to the section you're reading; below 1100px it folds into a single collapsible row.

**Anatomy** — title in `meta` capitals; items in `body-sm`, `ink-muted`, the current one `ink`; a 2px `line` track with the `accent` bar over it (200ms slide). `h3` items indent `space-4` further. The collapsed row is 48px, `surface`, with a list icon and a chevron.

**What you provide**
- `items` — `{ id, label, level }[]` built from the article's `h2` (and optionally `h3`) headings; `id` must match the heading's `id`.
- Optional `title` (default "On this page"), `mode` (`auto` default: rail from 1100px, collapsible below; or force `rail` / `collapsible`), `sticky` (default `true`).
- By default it follows the scroll position (`spy`): a heading becomes current once it passes `offset` px (120) from the top. Pass `activeId` to control it yourself.

**Layout** — in the article grid it sits in a `toc-width` column right of the `measure` column and sticks at `header-height` + `space-6`. Give headings `scroll-margin-top` (Prose does) so jumps land below the sticky header.

**Do / don't**
- Do show it only when a post has three or more `h2` sections.
- Don't list more than about eight items; leave `h3`s out of long posts.
- It is a `<nav aria-label="On this page">`; the current link carries `aria-current="true"`.
