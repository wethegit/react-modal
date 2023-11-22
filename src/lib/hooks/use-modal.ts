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
   * Defines the animation effects of the modal.
   */
  prefersReducedMotion?: boolean
  /**
   * If set, the modal will be opened/closed by updating the route hash.
   */
  slug?: string
}

export function useModal({
  triggerRef,
  transitionDuration = 300,
  prefersReducedMotion,
  slug,
}: UseModalOptions) {
  const [state, setState] = useState<ModalStates>(ModalStates.CLOSED)
  const [delay, setDelay] = useState(() =>
    prefersReducedMotion ? 0 : transitionDuration
  )
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleClose = useCallback(() => {
    setState(ModalStates.CLOSING)

    if (triggerRef && triggerRef.current) triggerRef.current.focus()

    timer.current = setTimeout(() => {
      setState(ModalStates.CLOSED)
    }, delay)
  }, [delay, triggerRef])

  const handleOpen = useCallback(() => {
    setState(ModalStates.MOUNTED)

    // next tick
    timer.current = setTimeout(() => {
      setState(ModalStates.OPENING)

      timer.current = setTimeout(() => {
        setState(ModalStates.OPEN)
      }, delay)
    }, 10)
  }, [delay])

  // Toggle function for the modal state.
  // If a `slug` has been set, we'll only update the route/hash here —
  // state management will be handled on route change instead.
  const toggle = useCallback(() => {
    if (!window) return

    if (slug) {
      if (state === ModalStates.OPEN) {
        // Replace the state, AND explicitly remove the hash,
        // otherwise window.onhashchange won't fire
        window.location.hash = ""
        window.history.replaceState({}, "", window.location.pathname)
      } else {
        window.location.hash = `#!/${slug}`
      }
    } else {
      if (state === ModalStates.OPEN) handleClose()
      else handleOpen()
    }
  }, [handleClose, handleOpen, slug, state])

  // Manage the route changes if a slug was set
  useEffect(() => {
    if (!slug) return

    const handleHashChange = () => {
      if (window.location.hash === `#!/${slug}`) handleOpen()
      else handleClose()
    }

    // Check for a slug on mount
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [handleClose, handleOpen, slug])

  useEffect(() => {
    setDelay(prefersReducedMotion ? 0 : transitionDuration)
  }, [transitionDuration, prefersReducedMotion])

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
    // alias for simple state management
    isOpen: state !== ModalStates.CLOSED,
    state,
    toggle,
  }
}
