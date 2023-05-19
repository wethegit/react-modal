// packages
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { usePreventScroll } from "@wethegit/react-hooks"

// contexts
import { ModalContext } from "../context/modal-context"

// utils
import { modalPropTypes, modalDefaultProps } from "./modal-prop-types"
import { classnames } from "../utils/classnames"

export const ModalInner = ({
  children,
  className,
  closeDelay,
  onClose,
  onCloseStarted,
  onOpen,
  prefersReducedMotion,
  toggleFunction,
  triggerRef,
  ...props
}) => {
  const { handleClose } = useContext(ModalContext)
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

  usePreventScroll(true)

  const focusStartingPosition = () => {
    const element = firstFocusableElement.current
    if (element) element.focus()
  }

  const focusEndingPosition = () => {
    const element = lastFocusableElement.current
    if (element) element.focus()
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
  }, [onCloseStarted, exitDelay, closeComplete, handleClose])

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
  }, [onOpen])

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

  return (
    <div
      className={classnames([
        "modal",
        animateIn && "modal--entering",
        animateOut && "modal--exiting",
        prefersReducedMotion && "modal--reduced-motion",
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
  )
}

ModalInner.defaultProps = modalDefaultProps
ModalInner.propTypes = modalPropTypes
