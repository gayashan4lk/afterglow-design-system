# CodeBlock

A code sample on `surface` with a filename or language bar and a copy button.

**Anatomy** — 1px `line` border, `radius-lg`; a 44px bar with the filename (mono, `ink-muted`, case kept) and a small ghost copy button that turns into a check for two seconds (announced to screen readers); code in `code` type (Geist Mono 14/22) with `space-5` padding, scrolling sideways rather than wrapping. The scroll area is focusable for keyboard users.

**Colours** — plain text is `code-text`; Prism (`.token.keyword`…) and highlight.js (`.hljs-keyword`…) class names map to `code-comment`, `code-keyword`, `code-string`, `code-function`, `code-constant` and `code-tag`, all checked at 4.5:1 on `surface` in both themes.

**What you provide** — `code` (plain text, escaped for you) or `html` (already-highlighted markup from Prism, highlight.js or a class-based Shiki setup), plus optional `filename`, `language` (shown when there's no filename; also sets `language-*` on the `<code>`) and `copy` (default `true`).

**Do / don't**
- Do highlight at build time and pass `html`; the bundle ships no highlighter.
- Do keep samples short enough to read without scrolling down a full screen.
- Don't use CodeBlock for one command inside a sentence — use inline `code`.
