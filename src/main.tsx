import React, { useRef } from "react"
import { createRoot } from "react-dom/client"

import { Modal, ModalContent, useModal, ModalBackdrop } from "./lib"
import { classnames } from "./utils/classnames"

import styles from "./main.module.css"

function CustomModal() {
  const triggerButton = useRef(null)
  const { isOpen, toggle } = useModal({
    triggerRef: triggerButton,
  })

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal appendToBody>
          <ModalBackdrop onClick={toggle} className={styles.CustomModalOverlay} />
          <ModalContent className={classnames([styles.CustomModalContent])}>
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

function ModalWithHash() {
  const triggerButton = useRef(null)
  const { isOpen, toggle } = useModal({
    triggerRef: triggerButton,
    hash: "modal-with-hash",
  })

  return (
    <>
      <button ref={triggerButton} onClick={toggle}>
        Using a hash
      </button>

      {isOpen && (
        <Modal>
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
      <ModalWithHash />
      <a href="#modal-with-hash">Open modal from anchor without events</a>
    </>
  )
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
