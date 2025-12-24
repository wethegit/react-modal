"use client"

import ReactDOM from "react-dom"
import { ModalInner } from "../modal-inner"
import type { ModalInnerProps } from "../modal-inner"
import { classnames } from "../../../utils/classnames"

import styles from "./modal.module.scss"
export interface ModalProps extends ModalInnerProps {
  /**
   * The modal will be appended to the passed element instead of being rendered in place
   * @defaultValue defaults inPlace
   **/
  renderTo?: HTMLElement
  appendToBody?: boolean
}

export function Modal({ renderTo, appendToBody, className, ...props }: ModalProps) {
  const classes = classnames([
    styles.ModalFixed,
    className,
    appendToBody && styles.ModalAppend,
  ])

  const modalContent = <ModalInner className={classes} {...props} />

  if (renderTo) {
    return ReactDOM.createPortal(modalContent, renderTo)
  } else if (appendToBody) {
    // get the document body and append the modal there
    const document = globalThis.document

    return ReactDOM.createPortal(modalContent, document.body)
  }

  return modalContent
}
