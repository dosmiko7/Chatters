import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext, ReactNode } from "react";

import { auth } from "../firebase";

interface LoggedUserContextProps {
	loggedUser: User | null;
	isLoading: boolean;
}

const defaultValues: LoggedUserContextProps = {
	loggedUser: null,
	isLoading: true,
};

export const LoggedUserContext = createContext(defaultValues);

const LoggedUserProvider = ({ children }: { children: ReactNode }) => {
	const [loggedUser, setLoggedUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedUser(user);
				setIsLoading(false);
			} else {
				setLoggedUser(null);
			}
		});
		return () => unsub();
	}, []);

	return <LoggedUserContext.Provider value={{ loggedUser, isLoading }}>{children}</LoggedUserContext.Provider>;
};

export default LoggedUserProvider;
