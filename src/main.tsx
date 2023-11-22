import React, { useRef } from "react"
import ReactDOM from "react-dom"
import {
  Modal,
  ModalContent,
  ModalCloseButton,
  useModal,
  ModalBackdrop,
  ModalStates,
} from "./lib"
import { classnames } from "./utils/classnames"

import styles from "./main.module.css"

function App() {
  const triggerButton = useRef(null)
  const { isOpen, state, toggle, transitionDuration } = useModal({
    triggerRef: triggerButton,
    transitionDuration: 800,
  })

  return (
    <>
      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      <button ref={triggerButton} onClick={toggle}>
        Open the modal window!
      </button>

      {isOpen && (
        <Modal
          transitionDuration={transitionDuration}
          toggle={toggle}
          state={state}
          className={classnames([
            styles.CustomModal,
            state === ModalStates.OPENING && styles.CustomModalOpening,
            state === ModalStates.CLOSING && styles.CustomModalClosing,
          ])}
        >
          <ModalBackdrop onClick={toggle} className={styles.CustomModalOverlay} />
          <ModalContent className={styles.CustomModalContent}>
            <ModalCloseButton onClick={toggle} className={styles.CustomModalClose}>
              Close
            </ModalCloseButton>
            <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
          </ModalContent>
        </Modal>
      )}

      <button>Another button to test focus</button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
