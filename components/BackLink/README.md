# BackLink

The "← Back to changelog" link that sits in its own row above a post, in mono capitals.

**Anatomy** — `meta` type in capitals, `ink-muted`, turning `ink` on hover with the arrow nudging 2px left. The arrow is the `←` character, hidden from screen readers.

**What you provide** — `href` and the destination as children, without the arrow: `Back to changelog`, `All posts`.

**Placement** — in the breadcrumb band right under the header: a `<nav aria-label="Breadcrumb">` with `space-6` vertical padding, aligned to the container's left edge, with a full-bleed `line` below.

**Do / don't**
- Do name the real destination ("Back to releases"), not "Back".
- Don't use it inside article text or as a general-purpose link.
