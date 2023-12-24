import { useContext } from "react";

import { ModalContext } from "../ui/Modal";

export const useModal = () => {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error("ModalContext was used outside of ModalProvider");
	}

	return context;
};

export default useModal;
