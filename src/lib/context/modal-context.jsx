// At time of writing, this context only provides access to the handleClose() function,
// so that you can access it from within components other than the main Modal, such as
// custom <ModalCloseButton> components. For state management, see the useModal hook.
// – Andrew Rubin 2023-03-06
import PropTypes from "prop-types"
import { createContext, useRef } from "react"

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const handleClose = useRef()

  const value = {
    handleClose,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

ModalProvider.propTypes = {
  children: PropTypes.node,
}
