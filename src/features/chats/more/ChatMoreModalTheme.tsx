import { themes } from "../../../data/themes";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import Modal from "../../../ui/Modal";
import ChatMoreThemePicker from "./ChatMoreThemePicker";

const ChatMoreModalTheme = ({ setTheme }: { setTheme: string }) => {
	const themeObject = themes.find((obj) => obj.theme === `${setTheme}`);
	const background = themeObject?.background || "white";

	return (
		<Modal>
			<Modal.Open opens="themePicker">
				<Button style={{ background: background }}>Theme</Button>
			</Modal.Open>
			<Modal.Window name="themePicker">
				<Heading as="h2">Theme</Heading>
				<ChatMoreThemePicker />
			</Modal.Window>
		</Modal>
	);
};

export default ChatMoreModalTheme;
