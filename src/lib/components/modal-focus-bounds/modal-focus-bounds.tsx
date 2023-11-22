import { forwardRef } from "react"

import styles from "./modal-focus-bounds.module.scss"

export const ModalFocusBounds = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ModalFocusBounds(props, ref) {
  return <div className={styles.modalFocusBounds} ref={ref} tabIndex={0} {...props} />
})
