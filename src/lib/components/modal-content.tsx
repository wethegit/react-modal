import type React from "react";

export interface ModalContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalContent({ className, ...props }: ModalContentProps) {
	return <div className={className} {...props} />;
}
