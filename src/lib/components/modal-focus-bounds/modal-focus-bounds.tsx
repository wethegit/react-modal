import { forwardRef } from "react"

import styles from "./modal-focus-bounds.module.scss"

export const ModalFocusBounds = forwardRef<HTMLDivElement>(function ModalFocusBounds(
  _,
  ref
) {
  return <div className={styles.modalFocusBounds} ref={ref} tabIndex={0} />
})
