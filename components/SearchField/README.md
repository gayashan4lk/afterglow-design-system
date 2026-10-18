# SearchField

A search box for posts: a search icon, a placeholder, a "/" shortcut hint that becomes a clear button once there's text.

**Anatomy** — 40px (`sm`: 32px), `surface` fill, `line-strong` border (`ink-muted` on hover, `focus` plus `focus-ring` when focused), `radius-md`; text in `body-sm` `ink`, placeholder `ink-muted`; the shortcut in a small mono key cap. Max width 480px.

**What you provide** — optional `label` (the accessible name, also the default placeholder: "Search posts"), `placeholder`, `value` + `onChange` (controlled) or `defaultValue`, `onClear`, `shortcut` (default `/`; `false` to turn it off) and `size`. Any other input attributes pass through. It sits in a `role="search"` landmark.

**Behaviour** — pressing the shortcut anywhere on the page (outside another field) focuses it.

**Do / don't**
- Do place it above the post grid on index pages, or in a dialog opened from the header's search button.
- Don't show results inside the field; filter the grid below it or list results under it.
