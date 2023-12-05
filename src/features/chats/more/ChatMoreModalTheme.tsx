import { Button } from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import Modal from "../../../ui/Modal";
import ChatMoreThemePicker from "./ChatMoreThemePicker";

const ChatMoreModalTheme = () => {
	return (
		<Modal>
			<Modal.Open opens="themePicker">
				<Button variant="menu">theme</Button>
			</Modal.Open>
			<Modal.Window name="themePicker">
				<Heading as="h2">Theme</Heading>
				<ChatMoreThemePicker />
			</Modal.Window>
		</Modal>
	);
};

export default ChatMoreModalTheme;
