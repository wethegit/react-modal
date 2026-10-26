---
"@wethegit/react-modal": major
---

Replace the custom modal and focus trap with native `<dialog>` and `showModal()`.

BREAKING: Remove `ModalBackdrop` in favor of the native `::backdrop`. Pass the `dialogRef` returned by `useModal` to `Modal` to synchronize native closing with hook state and focus restoration. `Modal` now renders its children directly inside the dialog, centers them, and handles backdrop clicks internally.
