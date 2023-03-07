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

### Import the CSS

Import this wherever it makes sense to, based on your project structure:

```bash
import "@wethegit/react-modal/dist/main.css"
```

## Usage

The snippet below demonstrates the minimum required setup.

The `useModal` hook provides mechanisms for hooking into the modal state. We'll need to pass `modalState` and `toggleModal` to the `<Modal>` component, as shown below. This approach allows us to abstract away state management, which becomes especially useful when [using a URL hash to manage the modal's state](#using-a-url-hash-to-manage-the-modal-state).

The `<ModalCloseButton>` gives you control over where in the layout you'd like your modal's close button. By default there isn't one, so be sure to include this somewhere in the `<Modal>` component. This button can receive an `onClick` prop — the callback of which will be run _before_ the modal close logic.

```jsx
import { useRef } from "react"
import { Modal, ModalContent, ModalCloseButton, useModal } from "@wethegit/react-modal"

const YourComponent = () => {
  const { modalState, toggleModal } = useModal()
  const triggerButton = useRef()

  return (
    <button ref={triggerButton} onClick={() => toggleModal()}>
      Open the modal window!
    </button>

    {modalState && (
      // `triggerRef` allows the focus to shift to whatever triggered the modal, on close.
      <Modal toggleFunction={toggleModal} triggerRef={triggerButton}>
        <ModalCloseButton>Close</ModalCloseButton>
        <ModalContent>
          <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
        </ModalContent>
      </Modal>
    )}
  )
}
```

## Using a URL hash to manage the modal state

Commented lines indicate additions from the previous example:

```jsx
import { useEffect, useRef } from "react"
import { Modal, ModalContent, ModalCloseButton, useModal } from "@wethegit/react-modal"

const YourComponent = () => {
  // Get the `setModalSlug` function from the useModal hook:
  const { modalState, toggleModal, setModalSlug } = useModal()
  const triggerButton = useRef()

  // Set the modal's "slug", on mount of the component.
  // This can be done dynamically as well (in a click handler, for example)
  useEffect(() => {
    setModalSlug("my-modal-hash")
  }, [])

  return (
    <button ref={triggerButton} onClick={() => toggleModal()}>
      Open the modal window!
    </button>

    {modalState && (
      <Modal toggleFunction={toggleModal} triggerRef={triggerButton}>
        <ModalCloseButton>Close</ModalCloseButton>
        <ModalContent>
          <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
        </ModalContent>
      </Modal>
    )}
  )
}
```

## Props

### `<Modal>`

| prop                 | type      | default value | description                                                                                                                                                                                                                                                                                            |
| -------------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| appendToBody         | Boolean   | true          | Optional. Whether to append the Modal markup to the HTML `<body>` element, or to leave it where it exists within your component structure. Setting this to `false` can be useful for "local" dialog boxes.                                                                                             |
| className            | String    | null          |                                                                                                                                                                                                                                                                                                        |
| closeDelay           | Number    | 200           | The amount of time (milliseconds) before unmounting the modal after a close action. This allows time to animate the modal out, using the `.modal--exiting` CSS class.                                                                                                                                  |
| onClose              | Function  | null          | Optional. Callback to run when the modal unmounts.                                                                                                                                                                                                                                                     |
| onCloseStarted       | Function  | null          | Optional. Callback to run immeditaely after a close action, but before the modal unmounts.                                                                                                                                                                                                             |
| onOpen               | Function  | null          | Optional. Callback to run on open of the modal.                                                                                                                                                                                                                                                        |
| prefersReducedMotion | Boolean   | false         | Optional. Whether to use zero-millisecond animation delays and durations. This only applies to the intervals at which classNames are added and removed — styles are unaffected, and can be overwritten with your own CSS. To assist with this, the `.modal--reduced-motion` className will be applied. |
| toggleFunction       | Function  | null          | The modal's state setter function, as returned by `useModal`.                                                                                                                                                                                                                                          |
| triggerRef           | React Ref | null          | A React Ref bound to the button or link that triggered the opening of the modal.                                                                                                                                                                                                                       |

### `<ModalContent>`

| prop      | type   | default value | description |
| --------- | ------ | ------------- | ----------- |
| className | String | null          |             |

### `<ModalCloseButton>`

| prop      | type     | default value | description                                                                                       |
| --------- | -------- | ------------- | ------------------------------------------------------------------------------------------------- |
| className | String   | null          |                                                                                                   |
| onClick   | Function | null          | Optional. Callback to run immediately on click of the button, before the modal close logic fires. |

## Styling

The stylesheet that ships with this component uses the [BEM methodology](https://getbem.com/) for naming classes, the block element here being `.modal`. Have a look at the stylesheet to see what classes are available to be overridden.

## Accessibility

This component was built with focus accessibility best-practices at top-of-mind, and provides enough flexibility to allow you to create an accessible modal window.

### Focus loop

There are hidden elements at the start and end of the modal component, which, on focus, shift the user's focus to either the end or start of the content, respectively.

### Focus on close

The required `triggerRef` prop ensures that—on close of a modal—your user's focus is shifted back to where it was before opening the modal.

### Reduced motion

The `<Modal>` component can receive a boolean `prefersReducedMotion` prop, which can be used to override things like animation durations and delays. If passed with the value `true`, the open and close animations will happen instantly. The modal itself will also receive a CSS class name of `.modal--reduced-motion`, which you can use to adjust various CSS custom properties. We don't automatically add reduced motion styling, in the hope keeping the component unopinionated and to allow you to implement your CSS animation effects as you see fit. Here's an example of a reduced motion implementation:

```jsx
/* your jsx */
<Modal
  prefersReducedMotion={true}
  triggerRef={triggerRef}
  toggleFunction={toggleModal}
>
```

```css
/* your stylesheet */
.modal--reduced-motion {
  --duration: 0s;
  --content-delay: 0s;
}
```

To hook into whether the user prefers reduced motion, you can either use the browser's `matchMedia` API, or you can use the `<UserPreferencesProvider>` and `useUserPrefs` hooks from [@wethegit/react-hooks](https://www.npmjs.com/package/@wethegit/react-hooks).

- Using `matchMedia`:

```js
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches // => true or false
```

- Using `@wethegit/react-hooks`:

```jsx
// app.js, or wherever your React context providers live
import { UserPreferencesProvider } from "@wethegit/react-hooks"

const YourApp = ({ children }) => {
  return <UserPreferencesProvider>{children}</UserPreferencesProvider>
}
```

```jsx
import { useUserPrefs } from "@wethegit/react-hooks"

const YourComponent = () => {
  const { prefersReducedMotion } = useUserPrefs()
}
```
