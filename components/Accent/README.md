# Accent

A wrapper that re-points `accent`, `accent-ink`, `accent-soft` and `accent-glow` to one hue for everything inside it — how a post or a category page gets its colour.

**How it works** — it renders `data-accent="<hue>"`; `bundle.css` maps that attribute to the hue's four tokens. Components only ever use the `accent*` tokens, so a `Badge`, the table-of-contents bar and the hero art inside it all follow. Without a wrapper the accent is red. You can set the attribute yourself on any element (`<article data-accent="green">`) when you're not using React.

**What you provide** — `hue` (`red`, `orange`, `green`, `blue`, `purple`), `as` for the element (`article` for a post, `main` for a category page), and children.

**Choosing a hue** — by the post's category: red for security, breaking changes and retirements; orange for deprecations and upcoming changes; green for releases and improvements; blue for guides and docs; purple for research, community and opinion.

**Do / don't**
- Do wrap the whole post (header, hero, body) in one `Accent` so every accent use agrees.
- Don't nest two different accents inside one page; the one-accent rule is the brand.
- Don't use the accent for body text or buttons.
