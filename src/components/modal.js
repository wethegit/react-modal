// packages
import ReactDOM from "react-dom"

// components
import { ModalInner } from "./modal-inner"
import { ModalProvider } from "../context/modal-context"

// utils
import { modalPropTypes, modalDefaultProps } from "./modal-prop-types"

export const Modal = ({ appendToBody, children, ...props }) => {
  const renderModal = () => (
    <ModalProvider>
      <ModalInner {...props}>{children}</ModalInner>
    </ModalProvider>
  )

  if (appendToBody) return ReactDOM.createPortal(renderModal(), document.body)
  else return renderModal()
}

Modal.defaultProps = modalDefaultProps
Modal.propTypes = modalPropTypes
