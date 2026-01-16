import React, { useRef } from "react";
import { createRoot } from "react-dom/client";

import { Modal, ModalContent, useModal } from "./lib";
import styles from "./main.module.css";

function CustomModal() {
	const triggerButton = useRef<HTMLButtonElement>(null);
	const modalRootRef = useRef<HTMLDivElement>(null);
	const { isOpen, toggle, onClose } = useModal({
		triggerRef: triggerButton,
	});

	return (
		<>
			<button ref={triggerButton} onClick={toggle} type="button">
				Open the modal (HTMLElement)
			</button>
			<div ref={modalRootRef}></div>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				renderTo={modalRootRef.current || undefined}
			>
				<ModalContent className={styles.modalContent}>
					<button onClick={toggle} type="button">
						Close
					</button>
					<p>
						Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.
					</p>
				</ModalContent>
			</Modal>
		</>
	);
}

function CustomModalOnBody() {
	const triggerButton = useRef<HTMLButtonElement>(null);
	const bodyRef = useRef<HTMLElement | null>(null);
	const { isOpen, toggle, onClose } = useModal({
		triggerRef: triggerButton,
	});

	React.useEffect(() => {
		bodyRef.current = document.body;
	}, []);

	return (
		<>
			<button ref={triggerButton} onClick={toggle} type="button">
				Open the modal (Append to body)
			</button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				renderTo={bodyRef.current || undefined}
			>
				<ModalContent className={styles.modalContent}>
					<button onClick={toggle} type="button">
						Close
					</button>
					<p>
						Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.
					</p>
				</ModalContent>
			</Modal>
		</>
	);
}

function ModalWithHash() {
	const triggerButton = useRef<HTMLButtonElement>(null);
	const modalRootRef = useRef<HTMLDivElement>(null);
	const { isOpen, toggle, onClose } = useModal({
		triggerRef: triggerButton,
		hash: "modal-with-hash",
	});

	return (
		<>
			<button ref={triggerButton} onClick={toggle} type="button">
				Open the modal using a hash
			</button>
			<div ref={modalRootRef}></div>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				renderTo={modalRootRef.current || undefined}
			>
				<ModalContent className={styles.modalContent}>
					<button onClick={toggle} type="button">
						Close
					</button>
					<p>
						Voluptate Lorem ut minim excepteur sit fugiat anim magna aliquip.
					</p>
				</ModalContent>
			</Modal>
		</>
	);
}

function App() {
	return (
		<>
			<CustomModal />
			<CustomModalOnBody />
			<ModalWithHash />
			<a href="#modal-with-hash">
				Open modal using existing hash (#modal-with-hash) without events
			</a>
		</>
	);
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
