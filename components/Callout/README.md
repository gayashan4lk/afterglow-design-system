# Callout

A tinted note inside an article — Note, Tip, Important, Warning or Caution — whose colour is fixed by its type, not by the page accent.

**Anatomy** — `radius-lg` box on the type's `-soft` tint, `space-5` padding; a title row with a 20px icon and the type's word in `ui` 600 in its `-ink`; body in `body-sm` `ink`. No border, no side stripe.

| type | hue | icon | use for |
|---|---|---|---|
| `note` | blue | info | Useful background the reader might miss. |
| `tip` | green | lightbulb | A better way to do something. |
| `important` | purple | message-square-warning | Something they need to know to succeed. |
| `warning` | orange | triangle-alert | Something that can go wrong; act now. |
| `caution` | red | octagon-alert | Risk of data loss, downtime or a security issue. |

**What you provide** — `type` (default `note`), children (one or two short paragraphs, links allowed) and optionally `title` to replace the word ("Heads up").

**Do / don't**
- Do use at most two callouts per post; more and they stop being noticed.
- Don't use a callout for the main point of the post — that's the lead paragraph.
- The word and icon carry the meaning; colour only reinforces it.
