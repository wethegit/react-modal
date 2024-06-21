import ReactDOM from "react-dom"
import { usePreventScroll } from "@wethegit/react-hooks"

import { ModalInner } from "../modal-inner"
import type { ModalInnerProps } from "../modal-inner"
import { classnames } from "../../../utils/classnames"

import styles from "./modal.module.scss"
import { useMemo } from "react"
export interface ModalProps extends ModalInnerProps {
  /**
   * If provided, the modal will be appended to the provided element instead of being rendered in body
   * @defaultValue defaults to document.body
   **/
  renderTo?: string | HTMLElement
}

export function Modal({ renderTo, className, ...props }: ModalProps) {
  const isClient = typeof window !== "undefined" && typeof document !== "undefined"
  // get modalRoot
  const modalRoot = useMemo(() => {
    if (!isClient) return null

    if (typeof renderTo === "string") {
      const element = document.querySelector(renderTo)
      if (element) return element
      // Console error when element not found
      console.error(`Element not found for selector: ${renderTo}`)
      return null
    }

    return renderTo || document.body
  }, [renderTo, isClient])

  const lockScrolling = isClient ? modalRoot === document.body : false

  usePreventScroll(lockScrolling)

  const classes = classnames([
    lockScrolling ? styles.ModalFixed : styles.ModalAbsolute,
    className,
  ])

  const modalContent = <ModalInner className={classes} {...props} />

  if (modalRoot) {
    return ReactDOM.createPortal(modalContent, modalRoot)
  }

  return modalContent
}
