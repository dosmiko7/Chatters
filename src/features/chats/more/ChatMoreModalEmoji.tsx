import Modal from "../../../ui/Modal";
import { Button } from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import ChatMoreEmojiPicker from "./ChatMoreEmojiPicker";

const ChatMoreModalEmoji = ({ setEmoji }: { setEmoji: string }) => {
	return (
		<Modal>
			<Modal.Open opens="gifPicker">
				<Button>{setEmoji} Change emoji</Button>
			</Modal.Open>
			<Modal.Window name="gifPicker">
				<Heading as="h2">Emoji</Heading>
				<ChatMoreEmojiPicker />
			</Modal.Window>
		</Modal>
	);
};

export default ChatMoreModalEmoji;
