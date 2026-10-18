# Link

Every text link: underlined `link` blue inside prose, plain in navigation and footers, and with a trailing arrow when it leads somewhere next.

**Variants**
- `inline` (default) — prose. `link`, 1px underline at a 3px offset, `link-hover` on hover. Always underlined: colour alone never marks a link.
- `nav` — header navigation in `ui`. `ink-body`, no underline; `current` makes it `ink` with a 2px underline and sets `aria-current="page"`.
- `quiet` — footer, bylines, meta. `ink-muted`, underlined only on hover.
- `arrow` — "Read the post", "All releases". `ink` in `ui` with an arrow that nudges 2px right on hover.

**What you provide** — `href` and the text as children (say where it goes: "read the migration guide", never "click here"); `current` for the nav item of the page you're on; `external` for off-site links (opens a new tab, adds an arrow-up-right icon announced as "opens in a new tab").

**Do / don't**
- Do keep link text short and specific; a whole sentence underlined is hard to read.
- Don't use `nav` or `quiet` inside article prose.
- Focus shows a 2px `focus` outline (outline rather than `focus-ring`, so it wraps across line breaks).
