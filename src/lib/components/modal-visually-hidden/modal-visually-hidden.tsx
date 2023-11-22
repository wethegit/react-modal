import { forwardRef } from "react"

import styles from "./modal-visually-hidden.module.scss"

export interface ModalVisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> {
  onFocus?: () => void
}

export const ModalVisuallyHidden = forwardRef<HTMLDivElement, ModalVisuallyHiddenProps>(
  function ModalVisuallyHidden(props: ModalVisuallyHiddenProps, ref) {
    return (
      <div className={styles.modalVisuallyHidden} ref={ref} tabIndex={0} {...props} />
    )
  }
)
