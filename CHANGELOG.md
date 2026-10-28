# @wethegit/react-modal

## 4.3.0

### Minor Changes

- [#153](https://github.com/wethegit/react-modal/pull/153) [`b2da150`](https://github.com/wethegit/react-modal/commit/b2da150ded628128b43f8d37221373f289f6d2fe) Thanks [@copilot-swe-agent](https://github.com/apps/copilot-swe-agent)! - Use the History API (`pushState`/`replaceState`) instead of directly assigning `window.location.hash` when opening and closing hash-linked modals. This prevents Safari from scrolling the user to the top of the page. Also adds a `popstate` listener so browser back/forward navigation correctly opens and closes the modal.

## 4.2.0

### Minor Changes

- [#155](https://github.com/wethegit/react-modal/pull/155) [`014aa13`](https://github.com/wethegit/react-modal/commit/014aa138c71285822092a05564d7b06ad24f2994) Thanks [@copilot-swe-agent](https://github.com/apps/copilot-swe-agent)! - Add native CSS entry and exit transitions

## 4.1.0

### Minor Changes

- [#168](https://github.com/wethegit/react-modal/pull/168) [`6d5e836`](https://github.com/wethegit/react-modal/commit/6d5e836ff0005565a0036363d244b299b2ff56e1) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update dependencies to their latest compatible versions.

## 4.0.0

### Major Changes

- [#154](https://github.com/wethegit/react-modal/pull/154) [`6609cd1`](https://github.com/wethegit/react-modal/commit/6609cd1f32459900365b440c9b308a83d4024403) Thanks [@copilot-swe-agent](https://github.com/apps/copilot-swe-agent)! - Replace the custom modal and focus trap with native `<dialog>` and `showModal()`.

  BREAKING: Remove `ModalBackdrop` in favor of the native `::backdrop`. Pass the `dialogRef` returned by `useModal` to `Modal` to synchronize native closing with hook state and focus restoration. `Modal` now renders its children directly inside the dialog, centers them, and handles backdrop clicks internally.

## 3.2.0

### Minor Changes

- [#140](https://github.com/wethegit/react-modal/pull/140) [`70b791a`](https://github.com/wethegit/react-modal/commit/70b791a0748a2d777e69867822dbc03a3adf0986) Thanks [@NicholasLancey](https://github.com/NicholasLancey)! - Upgrades to React 19

### Patch Changes

- [#145](https://github.com/wethegit/react-modal/pull/145) [`c3ba12f`](https://github.com/wethegit/react-modal/commit/c3ba12f958385a9d9aca9e4e428fd477d1ae4b75) Thanks [@marlonmarcello](https://github.com/marlonmarcello)! - fix: checks for undefined state

## 3.0.0

### Major Changes

- [#79](https://github.com/wethegit/react-modal/pull/79) [`6c0e7f9`](https://github.com/wethegit/react-modal/commit/6c0e7f90c38e09fa2731d380da37c3fb697eb687) Thanks [@andrewrubin](https://github.com/andrewrubin)! - - **Removed** `appendToBody` prop.

  - The `appendToBody` prop has been removed. This prop was previously used to determine whether the modal should be appended to the body element.

  - **Added** `renderTo` prop.

    - Introduced the `renderTo` prop, which accepts an HTMLElement where the modal will be appended. This provides greater flexibilty, allowing users to specify any element to render the modal, including the body. This change enhances the customization options for the modal rendering.

  - Mark argument of hook as optional [#62](https://github.com/wethegit/react-modal/issues/62)

  - **Before**

    ```javascript
    <Modal appendToBody={true} />
    ```

  - **After**

    ```javascript
    <Modal renderTo={modalRef} />
    ```

## 2.2.2

### Patch Changes

- [#18](https://github.com/wethegit/react-modal/pull/18) [`888f892`](https://github.com/wethegit/react-modal/commit/888f892e697a2b37b0d871c0c0280f7bf1a0cf6a) Thanks [@marlonmarcello](https://github.com/marlonmarcello)! - fix: commonjs support

## 2.2.1

### Patch Changes

- [#16](https://github.com/wethegit/react-modal/pull/16) [`4a7ac9b`](https://github.com/wethegit/react-modal/commit/4a7ac9b009db57e3ff31658ac9f5702f5543d1a9) Thanks [@marlonmarcello](https://github.com/marlonmarcello)! - hotfix: exported types

## 2.2.0

### Minor Changes

- [#14](https://github.com/wethegit/react-modal/pull/14) [`22e9f45`](https://github.com/wethegit/react-modal/commit/22e9f45aa77042fc7acaf006f0d4efbdf99c03c7) Thanks [@andrewrubin](https://github.com/andrewrubin)! - Fix: positiong class names not being passed down if appendToBody is true

## 2.0.2

### Patch Changes

- [#12](https://github.com/wethegit/react-modal/pull/12) [`f603cd2`](https://github.com/wethegit/react-modal/commit/f603cd290c5932b8ae67a8c12b2b69fab8653754) Thanks [@marlonmarcello](https://github.com/marlonmarcello)! - Fixes and issue where the modal would lock the body even though `appendToBody` wasn't set to `true`

## 2.0.1

### Patch Changes

- [#10](https://github.com/wethegit/react-modal/pull/10) [`1e4fba5`](https://github.com/wethegit/react-modal/commit/1e4fba52e05da8dc2f046a4e58ce99633bfb8070) Thanks [@marlonmarcello](https://github.com/marlonmarcello)! - fix: ensures empty params doesn't throw

## 2.0.0

### Major Changes

- [#7](https://github.com/wethegit/react-modal/pull/7) [`4512c52`](https://github.com/wethegit/react-modal/commit/4512c52e7c2baca133fa03e33762639a04b46938) Thanks [@marlonmarcello](https://github.com/marlonmarcello)! - # V2

  ## Breaking changes

  Seriously, everything.

  ## Why

  The old design of the modal was good but it had an achilles heel, it used an internal context to handle the transition and syncing that with the state which caused:

  1. Actions to be tied to a context, adding custom components to close the modal for example was a bit annoying
  2. Animation and state were too tightly coupled and not exposed for further customization

  ## What's new

  The modal is now a controlled component, you can control the state of the modal from outside using the hook `useModal` which also exposes the state so you can use further customize the Modal and even the child components.
