import { useEffect, useRef, useState } from "react"

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
   * Defines the animation effects of the modal.
   */
  prefersReducedMotion?: boolean
}

export function useModal({
  triggerRef,
  transitionDuration = 300,
  prefersReducedMotion,
}: UseModalOptions) {
  const [state, setState] = useState<ModalStates>(ModalStates.CLOSED)
  const [modalSlug, setModalSlug] = useState<string | null>(() => null)
  const [exitDelay, setExitDelay] = useState(() =>
    prefersReducedMotion ? 0 : transitionDuration
  )
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleClose = () => {
    setState(ModalStates.CLOSING)

    if (triggerRef && triggerRef.current) triggerRef.current.focus()

    timer.current = setTimeout(() => {
      setState(ModalStates.CLOSED)
    }, exitDelay)
  }

  const handleOpen = () => {
    setState(ModalStates.MOUNTED)

    // next tick
    timer.current = setTimeout(() => {
      setState(ModalStates.OPENING)

      timer.current = setTimeout(() => {
        setState(ModalStates.OPEN)
      }, exitDelay)
    }, 10)
  }

  // Toggle function for the modal state.
  // If a `modalSlug` has been set, we'll only update the route/hash here —
  // state management will be handled on route change instead.
  const toggle = () => {
    if (!window) return

    if (modalSlug) {
      if (state === ModalStates.OPEN) {
        // Replace the state, AND explicitly remove the hash,
        // otherwise window.onhashchange won't fire
        window.location.hash = ""
        window.history.replaceState({}, "", window.location.pathname)
      } else {
        window.location.hash = `#!/${modalSlug}`
      }
    } else {
      if (state === ModalStates.OPEN) handleClose()
      else handleOpen()
    }
  }

  // Manage the route changes if a slug was set
  useEffect(() => {
    if (!modalSlug) return

    const handleHashChange = () => {
      if (window.location.hash === `#!/${modalSlug}`) open()
      else close()
    }

    // Check for a slug on mount
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [modalSlug])

  useEffect(() => {
    setExitDelay(prefersReducedMotion ? 0 : transitionDuration)
  }, [transitionDuration, prefersReducedMotion])

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  return {
    // alias for simple state management
    isOpen: state !== ModalStates.CLOSED,
    state,
    toggle,
    setModalSlug,
    transitionDuration,
  }
}
