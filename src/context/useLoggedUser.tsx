import { useContext } from "react";

import { LoggedUserContext } from "./LoggedUserContext";

export const useLoggedUser = () => {
	const context = useContext(LoggedUserContext);
	if (context === undefined) {
		throw new Error("LoggedUserContext was used outside of LoggedUserProvider");
	}

	return context;
};

export default useLoggedUser;
