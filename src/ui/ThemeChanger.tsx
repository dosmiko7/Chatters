import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa6";

import useDarkTheme from "../context/useDatkTheme";
import { displayInfo } from "../style/Templates";
import Button from "./Button";

const StyledThemeChanger = styled(Button)`
	${displayInfo({ message: "Change theme", position: "right" })};
`;

const ThemeChanger = () => {
	const { isDarkTheme, toggleDarkTheme } = useDarkTheme();

	let symbol;
	if (isDarkTheme) symbol = <FaMoon />;
	else symbol = <FaSun />;

	return (
		<StyledThemeChanger
			variant="menu"
			size="large"
			onClick={toggleDarkTheme}
		>
			{symbol}
		</StyledThemeChanger>
	);
};

export default ThemeChanger;
