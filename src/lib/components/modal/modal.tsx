import ReactDOM from "react-dom"

import { ModalInner } from "../modal-inner/modal-inner"
import type { ModalInnerProps } from "../modal-inner/modal-inner"

export interface ModalProps extends ModalInnerProps {
  /**
   * If true, the modal will be appended to the body instead of being rendered in place.
   * @defaultValue true
   */
  appendToBody?: boolean
}

export function Modal({ appendToBody, ...props }: ModalProps) {
  if (appendToBody) return ReactDOM.createPortal(<ModalInner {...props} />, document.body)
  else return <ModalInner {...props} />
}
