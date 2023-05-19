import { useEffect, useState } from "react"

export const useModal = () => {
  const [open, setOpen] = useState(false)
  const [modalSlug, setModalSlug] = useState(() => null)

  // Toggle function for the modal state.
  // If a `modalSlug` has been set, we'll only update the route/hash here —
  // state management will be handled on route change instead.
  const toggleModal = () => {
    if (!window) return

    if (modalSlug) {
      if (open) {
        // Replace the state, AND explicitly remove the hash,
        // otherwise window.onhashchange won't fire
        window.location.hash = ""
        window.history.replaceState({}, "", window.location.pathname)
      } else {
        window.location.hash = `#!/${modalSlug}`
      }
    } else {
      setOpen((open) => !open)
    }
  }

  // Manage the route changes if a slug was set
  useEffect(() => {
    if (!modalSlug) return

    const handleHashChange = () => {
      if (window.location.hash === `#!/${modalSlug}`) setOpen(true)
      else setOpen(false)
    }

    // Check for a slug on mount
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [modalSlug])

  return {
    modalState: open,
    toggleModal,
    setModalSlug,
  }
}
