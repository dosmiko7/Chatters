import { useContext } from "react";

import { DarkThemeContext } from "./DarkThemeContext";

export const useDarkTheme = () => {
	const context = useContext(DarkThemeContext);
	if (context === undefined) {
		throw new Error("DarkThemeContext was used outside of DarkThemeProvider");
	}

	return context;
};

export default useDarkTheme;
