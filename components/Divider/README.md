# Divider

The 1px `line` hairline that separates bands of a page and groups within it — the system's substitute for shadows.

**What you provide** — `orientation` (`horizontal` default, rendered as `<hr>`; `vertical` between inline items, rendered as a `separator` span) and, for horizontal rules, `spacing`: `none` (default — the bands' own padding sets the rhythm), `sm` (`space-6`), `md` (`space-12`), `lg` (`space-16`).

**Do / don't**
- Do run band dividers full-bleed (edge to edge of the viewport), as between the header, breadcrumb row, post header, hero and body.
- Do use `md` between the article and a "Related posts" section.
- Don't use a divider as the only edge of an input or button — controls use `line-strong`.
- Don't stack a divider against a card's own border.
