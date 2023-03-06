import { forwardRef, useContext, useRef } from "react"
import PropTypes from "prop-types"

// contexts
import { ModalContext } from "../context/modal-context"

// utils
import { classnames } from "../lib/classnames"

const ModalCloseButton = ({ onClick, children, className, ...props }, inputRef) => {
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

ModalCloseButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default forwardRef(ModalCloseButton)
