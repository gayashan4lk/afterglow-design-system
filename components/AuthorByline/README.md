# AuthorByline

Who wrote the post: round pictures (or initials) overlapping, then the names, with a role line when there's a single author.

**Anatomy** — `md`: 40px avatars overlapping by 10px with a 2px ring in the ground colour; names in `ui` 500 `ink`; a single author's role in `caption` `ink-muted`. `sm`: 24px avatars and names in `body-sm` on one line, for post cards. Without a picture, initials in mono on `surface-strong`.

**What you provide** — `authors`: `{ name, role?, href?, avatar? }[]` (pictures square, at least 80px); `size` (`md` default, `sm`). Up to three pictures show; all names are listed ("A, B and C"). `href` links a name to the author's page. Pictures are decorative (`alt=""`) because the names are right beside them.

**Do / don't**
- Do place it under the title in `PostHeader` (`space-8` above) and in card footers at `sm`.
- Don't add social icons or follower counts here.
