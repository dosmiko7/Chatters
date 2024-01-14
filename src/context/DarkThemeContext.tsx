import { createContext, useEffect, ReactNode } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

interface DarkThemeContextProps {
	isDarkTheme: boolean;
	toggleDarkTheme: () => void;
}

export const DarkThemeContext = createContext<DarkThemeContextProps | undefined>(undefined);

const DarkThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDarkTheme, setIsDarkTheme] = useLocalStorageState<boolean>("isDarkTheme", true);

	const toggleDarkTheme = () => {
		setIsDarkTheme((prevTheme) => !prevTheme);
	};

	useEffect(() => {
		if (isDarkTheme) {
			document.documentElement.classList.add("dark-theme");
			document.documentElement.classList.remove("light-theme");
		} else {
			document.documentElement.classList.add("light-theme");
			document.documentElement.classList.remove("dark-theme");
		}
	}, [isDarkTheme]);

	return <DarkThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>{children}</DarkThemeContext.Provider>;
};

export default DarkThemeProvider;
