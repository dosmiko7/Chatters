import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

import { DarkThemeContext } from "../context/DarkThemeContext";
import { Button } from "./Button";

const ThemeChanger = () => {
	const { isDarkTheme, toggleDarkTheme } = useContext(DarkThemeContext);

	let symbol;
	if (isDarkTheme) symbol = <FaMoon />;
	else symbol = <FaSun />;

	return (
		<Button
			variant="menu"
			onClick={toggleDarkTheme}
		>
			{symbol}
		</Button>
	);
};

export default ThemeChanger;
