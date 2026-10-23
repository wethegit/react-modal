import { useEffect, useRef } from "react"

import { classnames } from "../../../utils/classnames"

import styles from "./modal-inner.module.scss"

export interface ModalInnerProps extends React.HTMLAttributes<HTMLDialogElement> {
  /**
   * The content of the modal.
   */
  children?: React.ReactNode
  /**
   * The className of the modal.
   */
  className?: string
  /**
   * A ref to the native dialog element.
   */
  dialogRef?: React.RefObject<HTMLDialogElement>
  /**
   * Called when the cancel event fires (e.g. user presses Escape).
   * The default browser close behaviour is always prevented so React state stays in control.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>
}

export function ModalInner({
  children,
  className,
  dialogRef: forwardedDialogRef,
  onCancel,
  ...props
}: ModalInnerProps) {
  const internalDialogRef = useRef<HTMLDialogElement>(null)
  const dialogRef = forwardedDialogRef ?? internalDialogRef

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal()
  }, [dialogRef])

  return (
    <dialog
      className={classnames([styles.modalInner, className])}
      ref={dialogRef}
      {...props}
      onCancel={(e) => {
        // Prevent the browser from closing the dialog so our React state
        // remains in control. The useModal hook handles closing via Escape.
        e.preventDefault()
        onCancel?.(e)
      }}
    >
      {children}
    </dialog>
  )
}
