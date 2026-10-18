# PostGrid

Lays out `PostCard`s: a responsive grid that goes from one to two to three columns by its own width, or a ruled list of changelog rows.

**Layouts**
- `grid` (default) — `space-8` gaps; 1 column, 2 from 600px of its own width, 3 from 960px. A `featured` card spans the full row.
- `list` — `row` cards stacked under a top hairline.

**What you provide** — `PostCard` children in date order (newest first) and `layout`. Put a row of filter `Tag`s above it and a `Pagination` below it.

**Do / don't**
- Do lead an index page with one featured card, then the grid.
- Do use `list` for changelogs and release notes, where dates matter more than pictures.
- Don't mix `row` cards into a `grid`, or grid cards into a `list`.
