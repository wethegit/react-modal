# @wethegit/react-modal

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
