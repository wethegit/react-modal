import React, { useRef, useEffect } from "react"
import { createRoot } from "react-dom/client"

import { Modal, ModalContent, useModal, ModalBackdrop } from "./lib"
import { classnames } from "./utils/classnames"

import styles from "./main.module.css"

function CustomModal() {
  const triggerButton = useRef(null)
  const modalRootRef = useRef(null)
  const { isOpen, toggle } = useModal({
    triggerRef: triggerButton,
  })

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Open the modal (HTMLElement)
      </button>
      <div ref={modalRootRef}></div>

      {isOpen && modalRootRef.current && (
        <Modal renderTo={modalRootRef.current}>
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

function CustomModalOnBody() {
  const triggerButton = useRef(null)
  const bodyRef = useRef<HTMLElement | null>(null)
  const { isOpen, toggle } = useModal({
    triggerRef: triggerButton,
  })

  useEffect(() => {
    bodyRef.current = document.body
  }, [])

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Open the modal (Append to body)
      </button>

      {isOpen && bodyRef.current && (
        <Modal renderTo={bodyRef.current} className={styles.CustomModalAbsolute}>
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
  const modalRootRef = useRef(null)
  const { isOpen, toggle } = useModal({
    triggerRef: triggerButton,
    hash: "modal-with-hash",
  })

  return (
    <>
      <button ref={triggerButton} onClick={toggle}>
        Open the modal using a hash
      </button>
      <div ref={modalRootRef}></div>

      {isOpen && modalRootRef.current && (
        <Modal renderTo={modalRootRef.current}>
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
