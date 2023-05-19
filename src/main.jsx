import React, { useRef } from "react"
import ReactDOM from "react-dom"
import { Modal, ModalContent, ModalCloseButton, useModal } from "./lib"

function App() {
  const { modalState, toggleModal } = useModal()
  const triggerButton = useRef()

  return (
    <>
      <button ref={triggerButton} onClick={() => toggleModal()}>
        Open the modal window!
      </button>

      {/* `triggerRef` allows the focus to shift to whatever triggered the modal, on close. */}
      {modalState && (
        <Modal toggleFunction={toggleModal} triggerRef={triggerButton}>
          <ModalCloseButton>Close</ModalCloseButton>
          <ModalContent>
            <p>Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.</p>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
