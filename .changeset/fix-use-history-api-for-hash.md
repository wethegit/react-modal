---
"@wethegit/react-modal": minor
---

Use the History API (`pushState`/`replaceState`) instead of directly assigning `window.location.hash` when opening and closing hash-linked modals. This prevents Safari from scrolling the user to the top of the page. Also adds a `popstate` listener so browser back/forward navigation correctly opens and closes the modal.
