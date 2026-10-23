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

  const isOutsideContent = (event: React.PointerEvent<HTMLDialogElement>) => {
    const { currentTarget, clientX, clientY } = event

    for (const child of Array.from(currentTarget.childNodes)) {
      let rects: DOMRect[]

      if (child.nodeType === Node.TEXT_NODE) {
        if (!child.textContent?.trim()) continue
        const range = document.createRange()
        range.selectNode(child)
        rects = Array.from(range.getClientRects())
      } else if (child instanceof Element) {
        rects = [child.getBoundingClientRect()]
      } else {
        continue
      }

      if (
        rects.some(
          (rect) =>
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
        )
      ) {
        return false
      }
    }

    return true
  }

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
