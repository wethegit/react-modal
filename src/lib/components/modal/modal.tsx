import ReactDOM from "react-dom"
import { usePreventScroll } from "@wethegit/react-hooks"

import { ModalInner } from "../modal-inner"
import type { ModalInnerProps } from "../modal-inner"
import { classnames } from "../../../utils/classnames"

import styles from "./modal.module.scss"
export interface ModalProps extends ModalInnerProps {
  /**
   * If provided, the modal will be appended to the provided element instead of being rendered in body
   * @defaultValue defaults to document.body
   **/
  renderTo?: string | HTMLElement
}

const getModalRoot = (renderTo?: string | HTMLElement) => {
  if (typeof renderTo === "string") {
    return document.querySelector(renderTo) || document.body
  }

  return renderTo || document.body
}

export function Modal({ renderTo, className, ...props }: ModalProps) {
  const modalRoot = getModalRoot(renderTo)
  const appendToBody = modalRoot === document.body

  usePreventScroll(appendToBody)

  const classes = classnames([
    appendToBody ? styles.ModalFixed : styles.ModalAbsolute,
    className,
  ])

  const modalContent = <ModalInner className={classes} {...props} />

  if (modalRoot) {
    return ReactDOM.createPortal(modalContent, modalRoot)
  }

  return modalContent
}
