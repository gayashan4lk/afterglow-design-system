# NewsletterSignup

An email signup box: a short pitch on one side, one email field and one primary button on the other, with sending, success and error states.

**Anatomy** — `surface` box with a `line` border and `radius-lg`. Title in `h3` `ink`, description in `body-sm` `ink-body`. The field is an `ag-input` on `canvas` with a `line-strong` border; the button is the view's `primary`. Success replaces the form with a green check and message (`role="status"`); errors add a red message under it (`role="alert"`) and mark the field invalid. Side by side from 720px of its own width, stacked below.

**What you provide** — `onSubmit(email)` returning a promise (resolve = subscribed, reject = error); optional `title`, `description`, `buttonLabel`, `finePrint` ("One email a month. Unsubscribe any time."), `successMessage` and `errorMessage`.

**Do / don't**
- Do place it once per page: after the article body, or between the grid and the footer.
- Do say how often you'll send and how to leave in `finePrint`.
- Don't ask for more than an email address.
