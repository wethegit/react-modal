import { classnames } from "../../../utils/classnames"

import styles from "./modal-content.module.scss"

export type ModalContentProps = React.HTMLAttributes<HTMLDivElement>

export function ModalContent({ className, ...props }: ModalContentProps) {
  return <div className={classnames([styles.modalContent, className])} {...props} />
}
