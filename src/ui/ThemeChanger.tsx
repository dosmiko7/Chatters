import { useContext } from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa6";

import { DarkThemeContext } from "../context/DarkThemeContext";
import { displayInfo } from "../style/Templates";
import { Button } from "./Button";

const StyledThemeChanger = styled(Button)`
	${displayInfo({ message: "Change theme", position: "right" })};
`;

const ThemeChanger = () => {
	const { isDarkTheme, toggleDarkTheme } = useContext(DarkThemeContext);

	let symbol;
	if (isDarkTheme) symbol = <FaMoon />;
	else symbol = <FaSun />;

	return (
		<StyledThemeChanger
			variant="menu"
			onClick={toggleDarkTheme}
		>
			{symbol}
		</StyledThemeChanger>
	);
};

export default ThemeChanger;
