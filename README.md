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

If using a bundler, import this wherever it makes sense to, based on your project structure:

```bash
import "@wethegit/react-modal/style.css"
```

If not using a bundler, you can import the stylesheet directly into your HTML:

```html
<link rel="stylesheet" href="node_modules/@wethegit/react-modal/style.css" />
```

## Usage

The `useModal` hook provides mechanisms for hooking into the modal state. We'll need to pass said `state` to the `<Modal>` component, as shown below. This approach allows us to abstract away state management, which becomes especially useful when [using a URL hash to manage the modal's state](#using-a-url-hash-to-manage-the-modal-state).

The snippet below demonstrates the **minimum** required setup. No focus management, no animations.

```jsx
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  useModal
} from "@wethegit/react-modal"

function MyModal() {
  const { isOpen, state, toggle } = useModal()

  return (
    <>
      <button onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal state={state}>
          <ModalBackdrop onClick={toggle} />
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
  ModalBackdrop,
  useModal
} from "@wethegit/react-modal"

function MyModal() {
  const { isOpen, state, toggle } = useModal({
    hash: "my-modal-hash"
  })

  return (
    <>
      <button onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal state={state}>
          <ModalBackdrop onClick={toggle} />
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

Custom transition, focus management and hash-based state management.


```jsx
function MyModal() {
  const TRANSITION = 800
  const triggerButton = useRef(null)

  const { isOpen, state, toggle } = useModal({
    // `triggerRef` allows the focus to shift to whatever triggered the modal
    triggerRef: triggerButton,
    // `transitionDuration` is used to set the duration of the modal's open/close animation
    transitionDuration: TRANSITION,
    // `hash` will automatically open the modal when hash changes and will also update the hash when the modal opens/closes
    hash: "modal-with-hash",
  })

  // Custom transition must be set on the <Modal> component, how you do it, inline styles or as a className, is up to you
  const stylesVars = {
    "--transition-duration": `${TRANSITION}ms`,
  }

  /*
    up to you how you want to handle the animation
    - you can add separate classes for each state to customize the animation even further
    - you can also simply customize the parent <Modal> component
    etc..
  */

  return (
    <>
      <button ref={triggerButton} onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal state={state} style={stylesVars}>
          <ModalBackdrop onClick={toggle} />
          <ModalContent
            className={`
              my-modal
              ${(
                state === ModalStates.OPENING ||
                state === ModalStates.OPEN
              ) && 'my-modal-open'}
            `}
          >
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

### `ModalStates`

```ts
enum ModalStates {
  CLOSED = "CLOSED",
  OPENING = "OPENING",
  OPEN = "OPEN",
  CLOSING = "CLOSING",
}
```

### `<Modal>`

| prop                 | type      | default value | description                                                                                                                                                                                                                                                                                            |
| -------------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| appendToBody         | Boolean   | true          | Optional. Whether to append the Modal markup to the HTML `<body>` element, or to leave it where it exists within your component structure. Setting this to `false` can be useful for "local" dialog boxes.                                                                                             |
| states | ModalStates   |           | The current state of the modal. This is passed to the component via the `state` property of the `useModal` hook.                                                                                                                                                                             |
| className            | String    | null          |                                                                                                                                                                                                                                                                                                        |
| children            | ReactNode | null          |                                                                                                                                                                                                                                                                                                        |


### `<ModalContent>`

A wrapper for the modal's content. This component is optional, but it's recommended to use it for styling purposes.

Any valid `<div>` props can be passed to this component.

### `<ModalBackdrop>`

A wrapper for the modal's backdrop. This component is optional, but it's recommended to use it for styling purposes.

Any valid `<div>` props can be passed to this component.

### `useModal`

| prop                 | type      | default value | description                                                                                                                                                                                                                                                                                            |
| -------------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hash                 | String    | null          | Optional. If provided, the hook will use the URL hash to manage the modal's state. This is useful for when you want to allow your users to share a link to a modal window, or when you want to allow your users to navigate to a modal window via a URL.                                                                                             |
| triggerRef           | RefObject | null          | Optional. If provided, the hook will shift the user's focus to this element when the modal closes.                                                                                                                                                                                                     |
| transitionDuration   | Number    | 300           | Optional. The duration of the modal's open/close animation.                                                                                                                                                                                                                                            |

## Styling

The component comes with minimal and sensible defaults including a subtle fade-in animation.

You can override these as you see fit and as your setup allows.

## Accessibility

This component was built with focus accessibility best-practices at top-of-mind, and provides enough flexibility to allow you to create an accessible modal window.

### Focus loop

There are hidden elements at the start and end of the modal component, which, on focus, shift the user's focus to either the end or start of the content, respectively.

### Focus on close

The `triggerRef` prop of the `useModal` hook ensures that—on close of a modal—your user's focus is shifted back to where it was before opening the modal.

### Reduced motion

The default fade-in transition only uses `opacity` and is under `0.5s` which is considered [okay](https://www.w3.org/WAI/GL/wiki/Animation_caused_by_user_interaction).

If you do customize the transition, you'll need to account for this yourself.

#### Example

```jsx
function MyModal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const TRANSITION = prefersReducedMotion ? 0 : 800
  const { state } = useModal({
    transitionDuration: TRANSITION
  })

  return (
    // ...omitted for brevity
    <Modal
      className="my-modal"
      style={{
        "--transition-duration": `${TRANSITION}ms`,
      }}
      state={state}
    />
  )
}
```

```css
/* your stylesheet */
.my-modal {
  transition: transform var(--transition-duration) ease-in-out;
  transform: translate3d(0, 100%, 0);
}

@media (prefers-reduced-motion: reduce) {
  .my-modal {
    transition: none;
  }
}
```