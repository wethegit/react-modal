// third-party
import ReactDOM from "react-dom"
import { useCallback, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"

// hooks
import { useUserPrefs, usePreventScroll } from "@wethegit/react-hooks"
import useLocale from "../../hooks/use-locale"

// components
import IconButton from "../icon-button/icon-button"

// styles
import * as styles from "./modal.module.scss"

export default function Modal({
  appendToBody = true,
  children,
  className,
  contentClassName,
  onClose,
  closeDelay = 0,
  onCloseStarted,
  onOpen,
  toggleFunction,
  triggerRef,
  ...props
}) {
  const { globals } = useLocale()
  const { prefersReducedMotion } = useUserPrefs()
  const [animateIn, setAnimateIn] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)
  const [exitDelay, setExitDelay] = useState(() =>
    prefersReducedMotion ? 0 : closeDelay
  )
  const closeBtn = useRef() // we'll treat this as the "first focusable element"
  const lastFocusableElement = useRef()
  const focusStartRef = useRef()
  const focusEndRef = useRef()
  const animationTimeout = useRef(null)

  usePreventScroll(true)

  const focusStartingPosition = () => {
    closeBtn.current.focus()
  }

  const focusEndingPosition = () => {
    lastFocusableElement.current.focus()
  }

  const closeComplete = useCallback(() => {
    if (onClose) onClose()
    if (triggerRef && triggerRef.current) triggerRef.current.focus()
    toggleFunction(false)
  }, [onClose, triggerRef, toggleFunction])

  const handleClose = useCallback(
    (_) => {
      if (onCloseStarted) onCloseStarted()
      setAnimateOut(true)
      setTimeout(() => {
        closeComplete()
      }, exitDelay)
    },
    [onCloseStarted, exitDelay, closeComplete]
  )

  useEffect(() => {
    // animate the modal contents on mount
    animationTimeout.current = setTimeout(() => setAnimateIn(true), 100)

    // Focus the close button on mount
    focusStartingPosition()

    // hook up focus event listeners
    focusStartRef.current.addEventListener("focus", (_) => focusEndingPosition())
    focusEndRef.current.addEventListener("focus", (_) => focusStartingPosition())

    if (onOpen) onOpen()

    return () => {
      clearTimeout(animationTimeout.current)
    }
  }, [])

  // Hook up the escape key
  useEffect(() => {
    const onKeyUp = function (e) {
      if (e.keyCode === 27) handleClose()
    }

    window.addEventListener("keyup", onKeyUp)

    return () => {
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [handleClose])

  useEffect(() => {
    setExitDelay(prefersReducedMotion ? 0 : closeDelay)
  }, [closeDelay, prefersReducedMotion])

  const renderModal = () => {
    return (
      <div
        className={clsx([
          styles.modal,
          animateIn && styles.modalActive,
          animateOut && styles.modalHeadingOut,
          className,
        ])}
        style={{ "--out-duration": `${exitDelay}ms` }}
        {...props}
      >
        <div className={styles.backdrop} onClick={handleClose}></div>
        <span className="visually-hidden" ref={focusStartRef} tabIndex="0"></span>
        <IconButton
          id="close"
          ref={closeBtn}
          onClick={handleClose}
          hiddenText={globals.close}
          className={clsx([styles.close, "focus-reverse"])}
          color="white"
        />

        <div className={clsx([styles.content, contentClassName])}>
          {children}
          {/* 
            Having an empty focusable element to maintain the "loop" isn't my favorite idea,
            so a potential to-do here could be: allow the developer to pass in a ref to set
            as their last focusable element.
          */}
          <span
            className={styles.hideFocusRing}
            ref={lastFocusableElement}
            tabIndex="0"
          ></span>
        </div>

        <span className="visually-hidden" ref={focusEndRef} tabIndex="0"></span>
      </div>
    )
  }

  if (appendToBody) return ReactDOM.createPortal(renderModal(), document.body)
  else return renderModal()
}

Modal.propTypes = {
  appendToBody: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  closeDelay: PropTypes.number,
  contentClassName: PropTypes.string,
  onClose: PropTypes.func,
  onCloseStarted: PropTypes.func,
  onOpen: PropTypes.func,
  toggleFunction: PropTypes.func.isRequired,
  triggerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
}
