import ReactDOM from "react-dom"
import { usePreventScroll } from "@wethegit/react-hooks"

import { ModalInner } from "../modal-inner"
import type { ModalInnerProps } from "../modal-inner"
import { classnames } from "../../../utils/classnames"

import styles from "./modal.module.scss"

export interface ModalProps extends ModalInnerProps {
  /**
   * If true, the modal will be appended to the body instead of being rendered in place.
   * @defaultValue true
   */
  appendToBody?: boolean
}

export function Modal({ appendToBody, className, ...props }: ModalProps) {
  usePreventScroll(appendToBody)

  if (appendToBody) return ReactDOM.createPortal(<ModalInner {...props} />, document.body)
  else
    return (
      <ModalInner
        className={classnames([
          appendToBody ? styles.ModalFixed : styles.ModalAbsolute,
          className,
        ])}
        {...props}
      />
    )
}
