import { FcIdea } from "react-icons/fc";

import useDarkTheme from "../../../context/useDarkTheme";
import Card from "../../../ui/Card";

const INFO = "Match the colors and shades of the application. Choose between light and dark themes.";

const SettingsOptionsTheme = () => {
	const { toggleDarkTheme } = useDarkTheme();

	return (
		<Card
			icon={<FcIdea />}
			heading="Change theme"
			info={INFO}
			onClickHandler={toggleDarkTheme}
		/>
	);
};

export default SettingsOptionsTheme;
