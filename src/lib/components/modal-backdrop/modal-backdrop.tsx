import { classnames } from "../../../utils/classnames"

import styles from "./modal-backdrop.module.scss"

export interface ModalBackdropProps {
  className?: string
  onClick?: () => void
}

export function ModalBackdrop({ className, ...props }: ModalBackdropProps) {
  return <div className={classnames([styles.modalBackdrop, className])} {...props} />
}
