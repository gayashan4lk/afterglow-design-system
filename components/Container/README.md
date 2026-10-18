# Container

Centres page content at one of the three layout widths, with the page gutters.

**Widths** — `container` (default, `container` token: header, footer, index grids), `wide` (`wide`: featured rows, wide figures), `measure` (`measure`: a lone column of text such as a newsletter block under an article). Gutters are `space-4`, and `space-8` from 768px; the width tokens are the content width, gutters are added outside them.

**What you provide** — children, `width`, and `as` for the element (`main`, `section`…).

**Do / don't**
- Do wrap every full-bleed band's content (breadcrumb row, index intro, related posts) in a Container so edges line up with the header.
- Don't nest Containers; pick the width you need.
