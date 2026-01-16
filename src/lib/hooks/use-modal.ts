import { useCallback, useEffect, useRef, useState } from "react";

export enum ModalStates {
	CLOSED = "closed",
	OPEN = "open",
}

export interface UseModalOptions {
	/**
	 * The ref of the element that should receive focus when the modal closes.
	 */
	triggerRef?: React.MutableRefObject<HTMLElement | null>;
	/**
	 * If set, the modal will be opened/closed by updating the route hash.
	 */
	hash?: string;
}

export function useModal(props: UseModalOptions = {}) {
	const { triggerRef, hash } = props;
	const [state, setState] = useState<ModalStates>(ModalStates.CLOSED);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleClose = useCallback(() => {
		let current: ModalStates | undefined;

		setState((cur) => {
			if (cur !== ModalStates.CLOSED) return ModalStates.CLOSED;

			current = cur;
			return cur;
		});

		if (current === ModalStates.CLOSED) return;

		if (hash && window && window.location.hash === `#${hash}`) {
			window.location.hash = "";
			window.history.replaceState({}, "", window.location.pathname);
		}

		if (triggerRef?.current) triggerRef.current.focus();
	}, [triggerRef, hash]);

	const handleOpen = useCallback(() => {
		let current: ModalStates | undefined;

		setState((cur) => {
			if (cur !== ModalStates.OPEN) return ModalStates.OPEN;

			current = cur;
			return cur;
		});

		if (current === ModalStates.OPEN) return;

		if (hash && window && window.location.hash !== `#${hash}`) {
			window.location.hash = `#${hash}`;
		}
	}, [hash]);

	const toggle = useCallback(() => {
		if (state === ModalStates.CLOSED) handleOpen();
		else handleClose();
	}, [handleClose, handleOpen, state]);

	// Manage the route changes if a hash was set
	useEffect(() => {
		if (!hash) return;

		const handleHashChange = () => {
			if (window.location.hash === `#${hash}`) handleOpen();
			else handleClose();
		};

		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, [handleClose, handleOpen, hash]);

	// Hook up the escape key (though <dialog> handles it, keep for custom logic)
	useEffect(() => {
		const onKeyUp = (e: KeyboardEvent) => {
			if (e.code === "Escape") handleClose();
		};

		window.addEventListener("keyup", onKeyUp);

		return () => {
			window.removeEventListener("keyup", onKeyUp);
		};
	}, [handleClose]);

	return {
		isOpen: state !== ModalStates.CLOSED,
		toggle,
		onClose: handleClose,
		dialogRef,
	};
}
