import { useEffect, useRef } from "react"
import { usePreventScroll } from "@wethegit/react-hooks"

import { classnames } from "../../../utils/classnames"
import { ModalStates } from "../../hooks"

import { ModalVisuallyHidden } from "../modal-visually-hidden"
import { ModalFocusBounds } from "../modal-focus-bounds"

import styles from "./modal-inner.module.scss"

export interface ModalInnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the modal.
   */
  children?: React.ReactNode
  /**
   * The className of the modal.
   */
  className?: string
  /**
   * The current state of the modal.
   */
  state: ModalStates
}

export function ModalInner({ state, children, className, ...props }: ModalInnerProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableElement = useRef<HTMLDivElement>(null)
  const lastFocusableElement = useRef<HTMLDivElement>(null)

  usePreventScroll(true)

  const focusStartingPosition = () => {
    const element = firstFocusableElement.current
    console.log("focusStartingPosition", element)
    if (element) element.focus()
  }

  const focusEndingPosition = () => {
    const element = lastFocusableElement.current
    console.log("focusEndingPosition", element)
    if (element) element.focus()
  }

  useEffect(() => {
    // Focus the first focusable element on mount.
    focusStartingPosition()
  }, [])

  return (
    <div
      className={classnames([
        styles.modalInner,
        state === ModalStates.OPENING && styles.modalOpening,
        state === ModalStates.OPEN && styles.modalOpen,
        state === ModalStates.CLOSING && styles.modalClosing,
        className,
      ])}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={state !== ModalStates.OPEN}
      tabIndex={state === ModalStates.CLOSED ? -1 : 0}
      {...props}
    >
      <ModalVisuallyHidden onFocus={focusEndingPosition} />

      <ModalFocusBounds ref={firstFocusableElement} />

      {children}

      <ModalFocusBounds ref={lastFocusableElement} />

      <ModalVisuallyHidden onFocus={focusStartingPosition} />
    </div>
  )
}
