// packages
import ReactDOM from "react-dom"
import { UserPreferencesProvider } from "@wethegit/react-hooks"

// components
import { ModalInner } from "./modal-inner"
import { ModalProvider } from "../context/modal-context"

// utils
import { modalPropTypes, modalDefaultProps } from "./modal-prop-types"

// styles
import "./modal.scss"

export const Modal = ({ appendToBody, children, ...props }) => {
  const renderModal = () => (
    <UserPreferencesProvider>
      <ModalProvider>
        <ModalInner {...props}>{children}</ModalInner>
      </ModalProvider>
    </UserPreferencesProvider>
  )

  if (appendToBody) return ReactDOM.createPortal(renderModal(), document.body)
  else return renderModal()
}

Modal.defaultProps = modalDefaultProps
Modal.propTypes = modalPropTypes
