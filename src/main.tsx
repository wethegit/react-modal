import React from "react"
import ReactDOM from "react-dom"

import { useRef } from "react"
import { Modal, ModalContent, useModal, ModalBackdrop, ModalStates } from "./lib"
import { classnames } from "./utils/classnames"

import styles from "./main.module.css"

function CustomModal() {
  const TRANSITION = 800
  const triggerButton = useRef(null)
  const { isOpen, state, toggle } = useModal({
    triggerRef: triggerButton,
    transitionDuration: TRANSITION,
  })

  // this could be set in the stylesheet as well but for sake of example we'll do it here
  const stylesVars = {
    "--transition-duration": `${TRANSITION}ms`,
  } as React.CSSProperties

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal
          state={state}
          className={classnames([
            styles.CustomModal,
            state === ModalStates.OPENING && styles.CustomModalOpening,
            state === ModalStates.CLOSING && styles.CustomModalClosing,
          ])}
          style={stylesVars}
        >
          <ModalBackdrop onClick={toggle} className={styles.CustomModalOverlay} />
          <ModalContent className={styles.CustomModalContent}>
            <button onClick={toggle} className={styles.CustomModalClose}>
              Close
            </button>
            <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

function ModalWithSlug() {
  const triggerButton = useRef(null)
  const { isOpen, state, toggle } = useModal({
    triggerRef: triggerButton,
    slug: "modal-with-slug",
  })

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Using a slug
      </button>

      {isOpen && (
        <Modal state={state}>
          <ModalBackdrop onClick={toggle} className={styles.CustomModalOverlay} />
          <ModalContent className={styles.CustomModalContent}>
            <button onClick={toggle} className={styles.CustomModalClose}>
              Close
            </button>
            <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

function App() {
  return (
    <>
      <CustomModal />
      <ModalWithSlug />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
