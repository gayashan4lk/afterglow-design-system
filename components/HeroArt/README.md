# HeroArt

The system's signature artwork: a hairline grid in `accent-glow` fading into the page, a half-disc rising from the bottom edge — `accent` at its rim melting through `accent-glow` into `canvas` — inside a wider `accent-glow` halo, and one `ink` spark on the rim.

**Sizes** — `md` (default): the full-bleed band on post pages, `hero-height` from 768px and 240px below; `sm`: 200px, for category and index pages; `card`: 160px, used inside `PostCard`. The disc keeps its proportions and stays centred on the bottom edge at every width; the grid stays 1px crisp.

**Colour** — it reads only the `accent*` tokens, so it takes the hue of the nearest `Accent` wrapper (red by default). In the light theme the glow tokens are pale tints and the art becomes a soft wash.

**What you provide** — optional `size` and `bordered` (hairlines above and below; default on for `md` and `sm`). It is decorative (`aria-hidden`) and takes no content.

**Do / don't**
- Do use it once per post, directly under the `PostHeader`, edge to edge.
- Don't put text, logos or mascots on it, and don't replace it with stock imagery; a post that needs a real picture puts it in the article as a figure.
