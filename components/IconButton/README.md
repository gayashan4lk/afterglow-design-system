# IconButton

A square button with only an icon — search, menu, theme switch, close, share — that always carries an accessible label.

**Use it** only where the icon is universally understood; everything else gets a `Button` with a word.

**What you provide** — `icon` (`IconName`) and `label` (required; becomes `aria-label` and the tooltip, e.g. "Search", "Open menu", "Switch to light theme"). Optional `variant` (`ghost` default, `secondary` with a `line-strong` outline), `size` (`md` 40px, `sm` 32px), `pressed` for toggles (sets `aria-pressed` and keeps the `surface-strong` fill), `href` to render a link.

**Do / don't**
- Do keep header icon buttons `md` so targets stay 40px.
- Do write the label as the action, not the icon's name ("Search", not "Magnifying glass").
- Don't put an accent colour on an icon button.
