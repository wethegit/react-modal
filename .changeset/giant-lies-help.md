---
"@wethegit/react-modal": major
---

# V2

## Breaking changes

Seriously, everything.

## Why

The old design of the modal was good but it had an achilles heel, it used an internal context to handle the transition and syncing that with the state which caused:

1. Actions to be tied to a context, adding custom components to close the modal for example was a bit annoying
2. Animation and state were too tightly coupled and not exposed for further customization

## What's new

The modal is now a controlled component, you can control the state of the modal from outside using the hook `useModal` which also exposes the state so you can use further customize the Modal and even the child components.
