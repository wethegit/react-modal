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
    if (element) element.focus()
  }

  const focusEndingPosition = () => {
    const element = lastFocusableElement.current
    if (element) element.focus()
  }

  useEffect(() => {
    if (state === ModalStates.MOUNTED) focusStartingPosition()
  }, [state])

  // this component takes care of its own focus management
  // anything rendered inside of it is up to the consumer
  const isHidden = state === ModalStates.CLOSED
  const tabIndex = isHidden ? -1 : 0

  return (
    <div
      className={classnames([
        styles.modalInner,
        (state === ModalStates.OPENING || state === ModalStates.OPEN) && styles.modalOpen,
        className,
      ])}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={isHidden}
      tabIndex={tabIndex}
      {...props}
    >
      <ModalVisuallyHidden
        aria-hidden={isHidden}
        tabIndex={tabIndex}
        onFocus={focusEndingPosition}
      />

      <ModalFocusBounds
        aria-hidden={isHidden}
        tabIndex={tabIndex}
        ref={firstFocusableElement}
      />

      {children}

      <ModalFocusBounds
        aria-hidden={isHidden}
        tabIndex={tabIndex}
        ref={lastFocusableElement}
      />

      <ModalVisuallyHidden
        aria-hidden={isHidden}
        tabIndex={tabIndex}
        onFocus={focusStartingPosition}
      />
    </div>
  )
}
