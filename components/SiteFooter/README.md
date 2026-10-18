# SiteFooter

The closing band of every page: the site's name and one-line tagline, a few columns of links, then a bottom row with the legal line, small links, RSS and the theme switch.

**Anatomy** — `canvas` above a full-bleed `line`; content capped at `container`. Name in Geist 600 20px, tagline `body-sm` `ink-muted`; column titles in `meta` capitals `ink`; links are `Link variant="quiet"` in `body-sm`. A second `line` separates the bottom row (`caption`, `ink-muted`). Columns wrap by the footer's own width.

**What you provide** — `siteName`; optional `tagline`, `columns` (`{ title, links: { label, href }[] }[]`, two to four), `legal` ("© 2026 Signal Labs"), `bottomLinks` (Privacy, Terms), `rssHref`, `themeToggle` (default `true`).

**Do / don't**
- Do put the RSS link here on every blog.
- Do keep columns short (three to five links each).
- Don't repeat the header's primary button here; a `NewsletterSignup` above the footer does that job.
