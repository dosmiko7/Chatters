import { createContext, useEffect, useState, ReactNode } from "react";

interface DarkThemeContextProps {
	isDarkTheme: boolean;
	toggleDarkTheme: () => void;
}

const defaultValues: DarkThemeContextProps = {
	isDarkTheme: true,
	toggleDarkTheme: () => {},
};

export const DarkThemeContext = createContext(defaultValues);

const DarkThemeProvider = ({ children }: { children: ReactNode[] }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(true);

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
