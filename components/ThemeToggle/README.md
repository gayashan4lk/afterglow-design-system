# ThemeToggle

An icon button that switches the page between the dark and light themes and remembers the reader's choice.

**How it works** — it flips `data-theme` on `<html>` between `dark` and `light` and saves the choice in `localStorage` (key `afterglow-theme`; failures are ignored). The icon shows the theme you'd switch to: a sun on dark, a moon on light. It also follows changes made elsewhere (another toggle, your own script).

**Before first paint** call `Afterglow.initTheme()` (or inline the same few lines in `<head>`) so a returning reader never sees a flash of the wrong theme: it applies the saved choice, else the OS's `prefers-color-scheme`, else dark.

**What you provide** — nothing required. Optional `storageKey` and `size` (`md` in the header, `sm` in the footer).

**Do / don't**
- Do include it once in the header and, optionally, once in the footer.
- Don't label it with the current theme ("Dark mode") — its label is the action ("Switch to light theme").
