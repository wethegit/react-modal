# @wethegit/react-modal

- [Getting set up](#getting-set-up)
- [Usage](#usage)
- [Using a URL hash to manage state](#using-a-url-hash-to-manage-the-modal-state)
- [Props](#props)
- [Styling](#styling)
- [Accessibility](#accessibility)

## Getting set up

### Install

```bash
npm install @wethegit/react-modal
```

### CSS

Import this wherever it makes sense to, based on your project structure:

```js
import "@wethegit/react-modal/style.css"
```

## Usage

The `useModal` hook provides mechanisms for hooking into the modal state. Pass its `dialogRef` to `<Modal>` so the hook can control that specific dialog's native modality. This approach allows us to abstract away state management, which becomes especially useful when [using a URL hash to manage the modal's state](#using-a-url-hash-to-manage-the-modal-state).

The snippet below demonstrates the **minimum** required setup. No focus management, no animations.

```jsx
import {
  Modal,
  ModalContent,
  useModal
} from "@wethegit/react-modal"

function MyModal() {
  const { isOpen, toggle, dialogRef } = useModal()

  return (
    <>
      <button onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal dialogRef={dialogRef}>
          <ModalContent>
            <button onClick={toggle}>Close</button>
            <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
```

## Using a URL hash to manage the modal state

It's as easy as passing a `hash` prop to the `useModal` hook. The hook will then use the URL hash to manage the modal's state. This is useful for when you want to allow your users to share a link to a modal window, or when you want to allow your users to navigate to a modal window via a URL.

```jsx
import {
  Modal,
  ModalContent,
  useModal
} from "@wethegit/react-modal"

function MyModal() {
  const { isOpen, toggle, dialogRef } = useModal({
    hash: "my-modal-hash"
  })

  return (
    <>
      <button onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal dialogRef={dialogRef}>
          <ModalContent>
            <button onClick={toggle}>Close</button>
            <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
```

## Full example

Focus management, rendering to a custom element, and hash-based state management.

**Important:** Animation with `useAnimatePresence` is not included in this refactor. Support is deferred to [#155](https://github.com/wethegit/react-modal/issues/155). Render the modal conditionally with `isOpen`, without delaying unmount for an exit animation.

```jsx
import { useRef } from 'react'
import {
  Modal,
  ModalContent,
  useModal
} from "@wethegit/react-modal"

function MyModal() {
  const triggerButton = useRef(null)
  const modalRootRef = useRef(null)

  const { isOpen, toggle, dialogRef } = useModal({
    // `triggerRef` allows the focus to shift to whatever triggered the modal
    triggerRef: triggerButton,
    // `hash` will automatically open the modal when hash changes and will also update the hash when the modal opens/closes
    hash: "modal-with-hash",
  })

  return (
    <>
      <button ref={triggerButton} onClick={toggle}>
        Open the modal window!
      </button>
      <div ref={modalRootRef}></div>

      {isOpen && modalRootRef.current && (
        <Modal
          dialogRef={dialogRef}
          renderTo={modalRootRef.current}
        >
          <ModalContent>
            <button onClick={toggle}>
              Close
            </button>
            <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
```

## Props

### `<Modal>`

| prop                 | type      | default value | description                                                                                                                                                                                                                                                                                            |
| -------------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| renderTo         | HTMLElement   | null | If a valid HTMLElement is provided, the modal will be appended to that element. Otherwise will be rendered in place.                                                                                       |
| className            | String    | null          |                                                                                                                                                                                                                                                                                                        |
| dialogRef            | RefObject | null          | The ref returned by `useModal`, used to associate the hook with this specific native dialog.                                                                                                                                                                                                         |
| children            | ReactNode | null          |                                                                                                                                                                                                                                                                                                        |

The native dialog backdrop is styled with the `::backdrop` pseudo-element. Clicking the backdrop closes the modal automatically.

### `<ModalContent>`

A required wrapper for the modal's content. It also defines the content boundary used to distinguish backdrop interactions from clicks inside the modal.

Any valid `<div>` props can be passed to this component.

### `useModal`

| prop                 | type      | default value | description                                                                                                                                                                                                                                                                                            |
| -------------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hash                 | String    | null          | Optional. If provided, the hook will use the URL hash to manage the modal's state. This is useful for when you want to allow your users to share a link to a modal window, or when you want to allow your users to navigate to a modal window via a URL.                                                                                             |
| triggerRef           | RefObject | null          | Optional. If provided, the hook will shift the user's focus to this element when the modal closes.                                                                                                                                                                                                     |

## Styling

The component comes with minimal and sensible defaults.

You can override these as you see fit and as your setup allows.

## Accessibility

This component was built with focus accessibility best-practices at top-of-mind, and provides enough flexibility to allow you to create an accessible modal window.

### Focus trap

The modal uses the native `<dialog>` element with the `showModal()` method, which automatically traps focus within the dialog. This ensures keyboard navigation stays within the modal while it is open.

### Focus on close

The `triggerRef` prop of the `useModal` hook ensures that—on close of a modal—your user's focus is shifted back to where it was before opening the modal.