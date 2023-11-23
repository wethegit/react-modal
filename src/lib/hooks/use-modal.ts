import { useCallback, useEffect, useRef, useState } from "react"

export enum ModalStates {
  // Helper state to indicate that the modal can mount and show its content
  MOUNTED = "mounted",
  CLOSED = "closed",
  OPEN = "open",
  OPENING = "opening",
  CLOSING = "closing",
}

export interface UseModalOptions {
  /**
   * The ref of the element that should receive focus when the modal closes.
   */
  triggerRef?: React.MutableRefObject<HTMLElement | null>
  /**
   * The delay (in ms) after which the modal will be closed.
   * @defaultValue 300
   */
  transitionDuration?: number
  /**
   * If set, the modal will be opened/closed by updating the route hash.
   */
  hash?: string
}

export function useModal({
  triggerRef,
  transitionDuration = 300,
  hash,
}: UseModalOptions) {
  const [state, setState] = useState<ModalStates>(ModalStates.CLOSED)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleClose = useCallback(() => {
    let current: ModalStates | undefined

    setState((cur) => {
      if (cur === ModalStates.CLOSED) {
        // get the current state from the hook to avoid
        // an extra dependecy and stay within the render loop
        current = cur
        return cur
      }
      return ModalStates.CLOSING
    })

    // If the modal is already closed, don't do anything
    // we don't want unnecessary re-renders
    if (current === ModalStates.CLOSED) return

    if (triggerRef && triggerRef.current) triggerRef.current.focus()

    if (timer.current) clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      setState(ModalStates.CLOSED)
    }, transitionDuration)
  }, [transitionDuration, triggerRef])

  const handleOpen = useCallback(() => {
    let current: ModalStates | undefined

    setState((cur) => {
      if (cur === ModalStates.OPEN) {
        current = cur
        return cur
      }

      return ModalStates.MOUNTED
    })

    if (current === ModalStates.OPEN) return

    if (timer.current) clearTimeout(timer.current)

    // this function is essentially the same as `handleClose`
    // with the exception that we have a transitionary state to handle
    // mounting and animating the modal
    timer.current = setTimeout(() => {
      setState(ModalStates.OPENING)

      timer.current = setTimeout(() => {
        setState(ModalStates.OPEN)
      }, transitionDuration)
    }, 10)
  }, [transitionDuration])

  // Toggle function for the modal state.
  // If a `hash` has been set, we'll only update the route/hash here —
  // state management will be handled on route change instead.
  const toggle = useCallback(() => {
    if (!window) return

    if (hash) {
      if (state === ModalStates.OPEN) {
        // Replace the state, AND explicitly remove the hash,
        // otherwise window.onhashchange won't fire
        window.location.hash = ""
        window.history.replaceState({}, "", window.location.pathname)
      } else {
        window.location.hash = `#${hash}`
      }
    } else {
      // check all states in case user tried to close the modal in a transition
      if (state === ModalStates.CLOSING || state === ModalStates.CLOSED) handleOpen()
      else handleClose()
    }
  }, [handleClose, handleOpen, hash, state])

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
      clearTimeout(timer.current)
    }
  }, [handleClose])

  return {
    isOpen: state !== ModalStates.CLOSED,
    toggle,
    state,
  }
}
