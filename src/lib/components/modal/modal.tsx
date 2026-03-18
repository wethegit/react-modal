"use client"

import ReactDOM from "react-dom"
import { ModalInner } from "../modal-inner"
import type { ModalInnerProps } from "../modal-inner"

export interface ModalProps extends ModalInnerProps {
  /**
   * The modal will be appended to the passed element instead of being rendered in place
   * @defaultValue defaults inPlace
   **/
  renderTo: HTMLElement
}

export function Modal({ renderTo, ...props }: ModalProps) {
  const modalContent = <ModalInner {...props} />

  if (renderTo) {
    return ReactDOM.createPortal(modalContent, renderTo)
  }

  return modalContent
}
