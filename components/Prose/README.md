# Prose

Article typography for whatever your Markdown renders — headings, paragraphs, lists, quotes, links, inline and block code, figures, tables and rules — set at the reading measure.

**Anatomy** — max width `measure`; `body` (17/28) in `ink-body`; `space-6` between paragraphs; `h2` with `space-12` above, `h3` `space-8`, `h4` `space-6`, all `ink` and with `scroll-margin-top` for the sticky header. Links are underlined `link`. Lists indent `space-6` with `ink-muted` markers. Quotes are 20/32 `ink` behind a 2px `line-strong` rule. Inline code is mono 0.88em on `surface`. Images get `radius-lg` and a `line` border; captions are `caption` in `ink-muted`. Table headers sit on `surface-strong`.

**What you provide** — the article as children (React) or `html` (a rendered Markdown string). Optional `lead` styles the first paragraph in `lead` type; `as` picks the element (`article` for a post body). A figure with the class `ag-prose-wide` breaks out to `wide`.

**Inside it** — drop in `Callout`, `CodeBlock` and figures; their spacing is handled. Syntax colours for Prism and highlight.js class names come from the `code-*` tokens.

**Note** — Prose styles raw elements, so it repeats the sizes of the `h2`, `h3`, `h4`, `body`, `lead` and `code` type styles in `bundle.css`. Change those styles in `tokens.json` and update the matching `.ag-prose` rules too.

**Do / don't**
- Do keep one `h1` (the PostHeader title) and start the body at `h2`.
- Don't set prose wider than `measure` or change its colour per post.
