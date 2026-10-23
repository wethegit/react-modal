"use client"

import { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { classnames } from "../../../utils/classnames"
import { ModalContent, type ModalContentProps } from "../modal-content/modal-content"

import styles from "./modal.module.scss"

export interface ModalProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "children"> {
  /**
   * The modal will be appended to the passed element instead of being rendered in place
   * @defaultValue defaults inPlace
   **/
  renderTo: HTMLElement
  /**
   * A ref to the native dialog element.
   */
  dialogRef?: { readonly current: HTMLDialogElement | null }
  children: React.ReactElement<ModalContentProps, typeof ModalContent>
}

export function Modal({
  renderTo,
  dialogRef: forwardedDialogRef,
  className,
  onCancel,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  children,
  ...props
}: ModalProps) {
  const internalDialogRef = useRef<HTMLDialogElement>(null)
  const pointerDownRef = useRef<{ pointerId: number; outsideContent: boolean } | null>(
    null
  )
  const dismissOnClickRef = useRef(false)
  const dialogRef = forwardedDialogRef ?? internalDialogRef

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal()
  }, [dialogRef, renderTo])

  const isOutsideContent = (event: React.PointerEvent<HTMLDialogElement>) =>
    !event.nativeEvent
      .composedPath()
      .includes(event.currentTarget.firstElementChild as Element)

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    onClick?.(event)
    const shouldDismiss = event.detail > 0 && dismissOnClickRef.current
    dismissOnClickRef.current = false
    if (shouldDismiss && !event.defaultPrevented) {
      dialogRef.current?.close()
    }
  }

  const modal = (
    <dialog
      className={classnames([styles.modal, className])}
      ref={dialogRef as React.RefObject<HTMLDialogElement>}
      {...props}
      onClick={handleClick}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        pointerDownRef.current = {
          pointerId: event.pointerId,
          outsideContent: isOutsideContent(event),
        }
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        const pointerDown = pointerDownRef.current
        dismissOnClickRef.current =
          pointerDown?.pointerId === event.pointerId &&
          pointerDown.outsideContent &&
          isOutsideContent(event)
        pointerDownRef.current = null
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event)
        pointerDownRef.current = null
      }}
      onCancel={onCancel}
    >
      {children}
    </dialog>
  )

  if (renderTo) {
    return ReactDOM.createPortal(modal, renderTo)
  }

  return modal
}
