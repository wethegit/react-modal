import { useEffect, useRef } from "react"

import { classnames } from "../../../utils/classnames"

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
}

export function ModalInner({ children, className, ...props }: ModalInnerProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableElement = useRef<HTMLDivElement>(null)
  const lastFocusableElement = useRef<HTMLDivElement>(null)

  const focusStartingPosition = () => {
    const element = firstFocusableElement.current
    if (element) element.focus()
  }

  const focusEndingPosition = () => {
    const element = lastFocusableElement.current
    if (element) element.focus()
  }

  useEffect(() => {
    focusStartingPosition()
  }, [])

  return (
    <div
      className={classnames([styles.modalInner, className])}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={0}
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
