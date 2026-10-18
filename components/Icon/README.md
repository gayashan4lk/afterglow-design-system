# Icon

Lucide outline icons drawn in `currentColor` at a constant 1.75px stroke, bundled so nothing loads from the network.

**Sizes** — 14px inside badges and meta lines, 16px in fields and small buttons, 20px in buttons, nav and callouts (default). The stroke is scaled so it stays 1.75px on screen at every size.

**What you provide** — `name` (one of `ICON_NAMES`) and `size`. Add `label` only when the icon stands alone and means something; beside a word it is decorative and hidden from screen readers.

**The set** — arrows and chevrons (navigation, pagination, back to top), search, menu, close, sun and moon (theme), info, lightbulb, message-square-warning, triangle-alert and octagon-alert (the Note, Tip, Important, Warning and Caution callouts), rss and mail (subscribe), copy, check and link (code blocks, share), external-link, calendar and clock (meta), list and hash (table of contents, anchors), share-2.

**Do / don't**
- Do let the icon inherit its text token's colour; never colour an icon on its own.
- Don't mix in filled icons or another set. Need a new one? Add it from Lucide (same version) to `components/src/icons.ts`.
- Geometry is © Lucide contributors, ISC licence (`licenses/Lucide-ISC.txt`).
