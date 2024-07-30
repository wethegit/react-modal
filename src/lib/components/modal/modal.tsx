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
  renderTo: HTMLElement
}

export function Modal({ renderTo, className, ...props }: ModalProps) {
  const classes = classnames([styles.ModalFixed, className])

  const modalContent = <ModalInner className={classes} {...props} />

  if (renderTo) {
    return ReactDOM.createPortal(modalContent, renderTo)
  }

  return modalContent
}
