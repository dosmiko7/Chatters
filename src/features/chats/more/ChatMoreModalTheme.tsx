import { Button } from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import Modal from "../../../ui/Modal";
import ChatMoreThemePicker from "./ChatMoreThemePicker";
import { themes } from "../../../data/themes";

const ChatMoreModalTheme = ({ theme }: { theme: string }) => {
	const themeObject = themes.find((obj) => obj.theme === `${theme}`);
	const background = themeObject?.background || "white";

	return (
		<Modal>
			<Modal.Open opens="themePicker">
				<Button style={{ background: background }}>Change theme</Button>
			</Modal.Open>
			<Modal.Window name="themePicker">
				<Heading as="h2">Theme</Heading>
				<ChatMoreThemePicker />
			</Modal.Window>
		</Modal>
	);
};

export default ChatMoreModalTheme;
