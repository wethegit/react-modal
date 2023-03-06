// At time of writing, this context only provides access to the handleClose() function,
// so that you can access it from within components other than the main Modal, such as
// custom <ModalCloseButton> components. For state management, see the useModal hook.
// – Andrew Rubin 2023-03-06

import { createContext, useRef } from "react"

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const handleClose = useRef()

  const value = {
    handleClose,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export { ModalProvider as default, ModalContext }
