import { forwardRef } from "react"

import { classnames } from "../../../utils/classnames"

import styles from "./modal-close-button.module.scss"

export interface ModalCloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  function ModalCloseButton({ className, ...props }: ModalCloseButtonProps, ref) {
    return (
      <button
        className={classnames([styles.modalCloseButton, className])}
        ref={ref}
        {...props}
      />
    )
  }
)
