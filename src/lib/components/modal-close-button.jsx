import { forwardRef, useContext, useRef } from "react"
import PropTypes from "prop-types"

// contexts
import { ModalContext } from "../context/modal-context"

// utils
import { classnames } from "../utils/classnames"

function ForwardedModalCloseButton({ onClick, children, className, ...props }, inputRef) {
  const { handleClose } = useContext(ModalContext)
  const localRef = useRef()
  const parsedRef = inputRef || localRef

  const handleClick = () => {
    if (onClick) onClick()
    handleClose.current()
  }

  return (
    <button
      className={classnames(["modal__close-button", className])}
      onClick={handleClick}
      ref={parsedRef}
      {...props}
    >
      {children}
    </button>
  )
}

ForwardedModalCloseButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
}

export const ModalCloseButton = forwardRef(ForwardedModalCloseButton)
