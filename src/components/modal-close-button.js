import { forwardRef, useContext, useRef } from "react"

// contexts
import { ModalContext } from "../context/modal-context"

// utils
import { classnames } from "../lib/classnames"

export const ModalCloseButton = forwardRef(
  ({ onClick, children, className, ...props }, inputRef) => {
    const { handleClose } = useContext(ModalContext)
    const localRef = useRef()
    const parsedRef = inputRef.current ? inputRef : localRef

    if (!handleClose.current) return

    const handleClick = () => {
      if (onClick) onClick()
      handleClose.current()
    }

    return (
      <button
        class={classnames(["modal__close-button", className])}
        onClick={handleClick}
        ref={parsedRef}
        {...props}
      >
        {children}
      </button>
    )
  }
)
