import type React from "react";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
	/**
	 * Whether the modal is open.
	 */
	isOpen: boolean;
	/**
	 * Callback when the modal should close.
	 */
	onClose: () => void;
	/**
	 * The modal will be appended to the passed element instead of being rendered in place.
	 */
	renderTo?: HTMLElement;
}

export function Modal({
	isOpen,
	onClose,
	renderTo,
	children,
	className,
	...props
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleClose = () => {
			onClose();
		};

		dialog.addEventListener("close", handleClose);

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}

		return () => {
			dialog.removeEventListener("close", handleClose);
		};
	}, [isOpen, onClose]);

	const modalContent = (
		<dialog ref={dialogRef} className={className} {...props}>
			{children}
		</dialog>
	);

	if (renderTo) {
		return ReactDOM.createPortal(modalContent, renderTo);
	}

	return modalContent;
}
