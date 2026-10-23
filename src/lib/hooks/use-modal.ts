import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export enum ModalStates {
  CLOSED = "closed",
  OPEN = "open",
}

export interface UseModalOptions {
  /**
   * The ref of the element that should receive focus when the modal closes.
   */
  triggerRef?: React.MutableRefObject<HTMLElement | null>
  /**
   * If set, the modal will be opened/closed by updating the route hash.
   */
  hash?: string
}

export function useModal(props: UseModalOptions = {}) {
  const { triggerRef, hash } = props
  const [state, setState] = useState<ModalStates>(ModalStates.CLOSED)
  const stateRef = useRef(state)

  const closeState = useCallback(() => {
    if (stateRef.current === ModalStates.CLOSED) return
    stateRef.current = ModalStates.CLOSED
    setState(ModalStates.CLOSED)

    if (hash && window && window.location.hash === `#${hash}`) {
      window.location.hash = ""
      window.history.replaceState({}, "", window.location.pathname)
    }

    if (triggerRef && triggerRef.current) triggerRef.current.focus()
  }, [triggerRef, hash])

  const dialogRef = useMemo(() => {
    let dialog: HTMLDialogElement | null = null
    const handleDialogClose = () => {
      if (dialog && !dialog.open) closeState()
    }

    return {
      get current() {
        return dialog
      },
      set current(node: HTMLDialogElement | null) {
        dialog?.removeEventListener("close", handleDialogClose)
        dialog = node
        dialog?.addEventListener("close", handleDialogClose)
      },
    }
  }, [closeState])

  const handleClose = useCallback(() => {
    if (stateRef.current === ModalStates.CLOSED) return

    if (dialogRef.current?.open) dialogRef.current.close()
    closeState()
  }, [closeState, dialogRef])

  const handleOpen = useCallback(() => {
    if (stateRef.current === ModalStates.OPEN) return
    stateRef.current = ModalStates.OPEN
    setState(ModalStates.OPEN)

    if (hash && window.location.hash !== `#${hash}`) {
      window.location.hash = `#${hash}`
    }
  }, [hash])

  const toggle = useCallback(() => {
    if (state === ModalStates.CLOSED) handleOpen()
    else handleClose()
  }, [handleClose, handleOpen, state])

  // Manage the route changes if a hash was set
  useEffect(() => {
    if (!hash) return

    const handleHashChange = () => {
      if (window.location.hash === `#${hash}`) handleOpen()
      else handleClose()
    }

    // Check for a hash on mount
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [handleClose, handleOpen, hash])

  // Hook up the escape key
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Escape") handleClose()
    }

    window.addEventListener("keyup", onKeyUp)

    return () => {
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [handleClose])

  return {
    isOpen: state === ModalStates.OPEN,
    dialogRef,
    toggle,
  }
}
