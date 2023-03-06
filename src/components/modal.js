// packages
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { usePreventScroll, useUserPrefs } from "@wethegit/react-hooks"

// components
import ModalProvider, { ModalContext } from "../context/modal-context"

// utils
import classnames from "../lib/classnames"

// styles
import "./modal.scss"

const Modal = ({
  appendToBody,
  children,
  className,
  closeDelay,
  onClose,
  onCloseStarted,
  onOpen,
  toggleFunction,
  triggerRef,
  ...props
}) => {
  const { handleClose } = useContext(ModalContext)
  const { prefersReducedMotion } = useUserPrefs()
  const [animateIn, setAnimateIn] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)
  const [exitDelay, setExitDelay] = useState(() =>
    prefersReducedMotion ? 0 : closeDelay
  )
  const animationTimeout = useRef(null)
  const modalRef = useRef()
  const focusStartRef = useRef()
  const focusEndRef = useRef()
  const firstFocusableElement = useRef()
  const lastFocusableElement = useRef()

  usePreventScroll(state)

  const focusStartingPosition = () => {
    const element =
      firstFocusableElement.current || fallback_firstFocusableElement.current
    element.focus()
  }

  const focusEndingPosition = () => {
    const element = lastFocusableElement.current || fallback_lastFocusableElement.current
    element.focus()
  }

  const closeComplete = useCallback(() => {
    if (onClose) onClose()
    if (triggerRef && triggerRef.current) triggerRef.current.focus()
    toggleFunction(false)
  }, [onClose, triggerRef, toggleFunction])

  // Create our handleClose function, and bind it to the ModalContext value for handleCLose.
  // This way, we can access the function value and pass it to any custom ModalClose button,
  // regardless of where it lives.
  useEffect(() => {
    handleClose.current = () => {
      if (onCloseStarted) onCloseStarted()
      setAnimateOut(true)
      setTimeout(() => {
        closeComplete()
      }, exitDelay)
    }
  }, [onCloseStarted, exitDelay, closeComplete])

  useEffect(() => {
    // Animate the modal contents on mount.
    animationTimeout.current = setTimeout(() => setAnimateIn(true), 100)

    // Focus the first focusable element on mount.
    focusStartingPosition()

    // Hook up focus event listeners to create a focus loop within the modal.
    focusStartRef.current.addEventListener("focus", () => focusEndingPosition())
    focusEndRef.current.addEventListener("focus", () => focusStartingPosition())

    if (onOpen) onOpen()

    return () => {
      clearTimeout(animationTimeout.current)
    }
  }, [])

  // Hook up the escape key
  useEffect(() => {
    if (!handleClose.current) return

    const onKeyUp = (e) => {
      if (e.keyCode === 27) handleClose.current()
    }

    window.addEventListener("keyup", onKeyUp)

    return () => {
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [handleClose])

  useEffect(() => {
    setExitDelay(prefersReducedMotion ? 0 : closeDelay)
  }, [closeDelay, prefersReducedMotion])

  const renderModal = () => (
    <ModalProvider>
      <div
        className={classnames([
          "modal",
          animateIn && "modal--entering",
          animateOut && "modal--exiting",
          className,
        ])}
        ref={modalRef}
        style={{ "--out-duration": `${exitDelay}ms` }}
        {...props}
      >
        <div className="modal__backdrop" onClick={handleClose.current} />
        <span className="modal-util-visually-hidden" ref={focusStartRef} tabIndex="0" />
        <span className="modal__focus-bounds" ref={firstFocusableElement} tabIndex="0" />
        {children}
        <span className="modal__focus-bounds" ref={lastFocusableElement} tabIndex="0" />
        <span className="modal-util-visually-hidden" ref={focusEndRef} tabIndex="0" />
      </div>
    </ModalProvider>
  )

  if (appendToBody) return ReactDOM.createPortal(renderModal(), document.body)
  else return renderModal()
}

Modal.defaultProps = {
  appendToBody: true,
  closeDelay: 200,
}

Modal.propTypes = {
  appendToBody: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  closeDelay: PropTypes.number,
  onClose: PropTypes.func,
  onCloseStarted: PropTypes.func,
  onOpen: PropTypes.func,
  toggleFunction: PropTypes.func.isRequired,
  triggerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]).isRequired,
}

export default Modal
