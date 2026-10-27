import React, { useRef, useState } from "react"
import { createRoot } from "react-dom/client"

import { Modal, ModalContent, useModal } from "./lib"

import styles from "./main.module.css"

function CustomModal() {
  const triggerButton = useRef(null)
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)
  const { isOpen, toggle, dialogRef } = useModal({
    triggerRef: triggerButton,
  })

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Open the modal (HTMLElement)
      </button>
      <div ref={setModalRoot}></div>

      <Modal
        renderTo={modalRoot ?? undefined}
        dialogRef={dialogRef}
        isOpen={isOpen}
        className={styles.CustomModalOverlay}
      >
        <ModalContent
          className={`${styles.CustomModalContent} ${styles.CustomModalTransition}`}
        >
          <button onClick={toggle}>Close</button>
          <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
        </ModalContent>
      </Modal>
    </>
  )
}

function CustomModalOnBody() {
  const triggerButton = useRef(null)
  const { isOpen, toggle, dialogRef } = useModal({
    triggerRef: triggerButton,
  })

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Open the modal (Append to body)
      </button>

      <Modal
        renderTo={document.body}
        dialogRef={dialogRef}
        isOpen={isOpen}
        className={styles.CustomModalOverlay}
      >
        <ModalContent className={styles.CustomModalContent}>
          <button onClick={toggle}>Close</button>
          <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
        </ModalContent>
      </Modal>
    </>
  )
}

function ModalWithHash() {
  const triggerButton = useRef(null)
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)
  const { isOpen, toggle, dialogRef } = useModal({
    triggerRef: triggerButton,
    hash: "modal-with-hash",
  })

  return (
    <>
      <button ref={triggerButton} onClick={toggle}>
        Open the modal using a hash
      </button>
      <div ref={setModalRoot}></div>

      <Modal
        renderTo={modalRoot ?? undefined}
        dialogRef={dialogRef}
        isOpen={isOpen}
        className={styles.CustomModalOverlay}
      >
        <ModalContent className={styles.CustomModalContent}>
          <button onClick={toggle}>Close</button>
          <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
        </ModalContent>
      </Modal>
    </>
  )
}

function App() {
  return (
    <>
      <CustomModal />
      <CustomModalOnBody />
      <ModalWithHash />
      <a href="#modal-with-hash">
        Open modal using exisiting hash (#modal-with-hash) without events
      </a>
    </>
  )
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
