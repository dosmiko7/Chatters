import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

import { Overlay } from "./Overlay";
import { Button } from "./Button";

interface IModalSize {
	width?: string;
	height?: string;
}

const StyledModal = styled.div<IModalSize>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-primary-400);
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-lg);
	padding: var(--padding-md) var(--padding-lg);
	transition: var(--transition-all-5);
	width: ${(props) => props.width || "45rem"};
	height: ${(props) => props.height || "55rem"};
`;

const StyledButton = styled(Button)`
	position: absolute;
	left: 0;
	top: 0;
	transform: translate(-40%, -40%);
	background-color: var(--color-secondary-400);
	font-weight: var(--font-weight-medium);
	font-size: 1.8rem;

	&:hover {
		font-size: 2rem;
	}
`;

type ModalContextType = {
	openName: string;
	close: () => void;
	open: React.Dispatch<React.SetStateAction<string>>;
};

const initialModalContext: ModalContextType = {
	openName: "",
	close: () => {},
	open: () => {},
};

export const ModalContext = createContext(initialModalContext);

const Modal = ({ children }: { children: any[] }) => {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
};

const Open = ({ children, opens: opensWindowName }: { children: any; opens: string }) => {
	const { open } = useContext(ModalContext);

	const handleOnClick = () => {
		open(opensWindowName);
	};

	return cloneElement(children, { onClick: handleOnClick });
};

const Window = ({
	children,
	name,
	width,
	height,
}: {
	children: any;
	name: string;
	width?: string;
	height?: string;
}) => {
	const { openName, close } = useContext(ModalContext);

	if (name !== openName) {
		return null;
	}

	return createPortal(
		<Overlay>
			<StyledModal
				width={width}
				height={height}
			>
				<StyledButton
					onClick={close}
					variant="menu"
				>
					<HiXMark />
				</StyledButton>
				{children}
			</StyledModal>
		</Overlay>,
		document.body
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
