# Button

The action control: one solid primary per view, an outlined secondary beside it, and a quiet ghost for everything else.

**Use it for actions and calls to action** — "Get started", "Subscribe", "Copy link". For moving between pages inside prose or nav, use `Link`.

**Variants**
- `primary` — `inverse` fill with an `on-inverse` label. At most one per view (the header's main CTA, a newsletter submit).
- `secondary` (default) — 1px `ink` outline, `ink` label, `surface-strong` on hover. The header's second button.
- `ghost` — `ink-body` label, no border; `surface-strong` on hover. Toolbars, card footers, "Subscribe" next to a search icon.

**Sizes** — `md` (40px, `ui` type, 20px icons) in the header and forms; `sm` (32px, `caption` at 500, 16px icons) in cards and inline rows.

**What you provide** — the label as children (a verb, sentence case, no trailing punctuation); optional `iconStart` / `iconEnd` (`IconName`); `href` to render a link that looks like a button; any button or anchor attributes (`onClick`, `type`, `disabled`).

**Do / don't**
- Do put the primary rightmost in the header, the secondary to its left.
- Don't use two primaries side by side, or a primary inside article prose.
- Don't recolour a button with an accent — buttons stay neutral; the accent belongs to the story.
- Focus shows `focus-ring`; disabled drops to 45% opacity and ignores pointer events.
