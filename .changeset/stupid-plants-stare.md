---
"@wethegit/react-modal": major
---

## "@wethegit/react-modal": major

- **Removed** `appendToBody` prop.

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
