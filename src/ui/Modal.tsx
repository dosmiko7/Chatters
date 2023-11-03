import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { BiSolidXCircle } from "react-icons/bi";

import { Overlay } from "./Overlay";
import { Button } from "./Button";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
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

const ModalContext = createContext(initialModalContext);

const Modal = ({ children }: { children: any[] }) => {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
};

const Open = ({ children, opens: opensWindowName }: { children: any; opens: string }) => {
	const { open } = useContext(ModalContext);

	const handleOnClick = () => {
		console.log("SIEMA");
		open(opensWindowName);
	};

	return cloneElement(children, { onClick: handleOnClick });
};

const Window = ({ children, name }: { children: any; name: string }) => {
	const { openName, close } = useContext(ModalContext);

	if (name !== openName) {
		return null;
	}

	return createPortal(
		<Overlay>
			<StyledModal>
				<Button onClick={close}>
					<BiSolidXCircle />
				</Button>
				{children}
			</StyledModal>
		</Overlay>,
		document.body
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
