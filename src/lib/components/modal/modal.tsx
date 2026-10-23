"use client"

import { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { classnames } from "../../../utils/classnames"

import styles from "./modal.module.scss"

export interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  /**
   * The modal will be appended to the passed element instead of being rendered in place
   * @defaultValue defaults inPlace
   **/
  renderTo: HTMLElement
  /**
   * A ref to the native dialog element.
   */
  dialogRef?: { readonly current: HTMLDialogElement | null }
}

export function Modal({
  renderTo,
  dialogRef: forwardedDialogRef,
  className,
  onCancel,
  onClick,
  children,
  ...props
}: ModalProps) {
  const internalDialogRef = useRef<HTMLDialogElement>(null)
  const dialogRef = forwardedDialogRef ?? internalDialogRef

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal()
  }, [dialogRef])

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    onClick?.(event)
    if (event.target === event.currentTarget && !event.defaultPrevented) {
      dialogRef.current?.close()
    }
  }

  const modal = (
    <dialog
      className={classnames([styles.modal, className])}
      ref={dialogRef as React.RefObject<HTMLDialogElement>}
      {...props}
      onClick={handleClick}
      onCancel={(event) => {
        event.preventDefault()
        onCancel?.(event)
      }}
    >
      {children}
    </dialog>
  )

  if (renderTo) {
    return ReactDOM.createPortal(modal, renderTo)
  }

  return modal
}
