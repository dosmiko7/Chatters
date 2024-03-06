import { lazy } from "react";

import Modal from "../../../../../ui/Modal";
import Button from "../../../../../ui/Button";
import Heading from "../../../../../ui/Heading";
import withLoader from "../../../../../hocs/withLoader";
const ChatMoreEmojiPicker = lazy(() => import("./ChatMoreEmojiPicker"));

const ChatMoreEmojiPickerWithLoader = withLoader({
	componentToSuspense: ChatMoreEmojiPicker,
});

const ChatMoreModalEmoji = ({ setEmoji }: { setEmoji: string }) => {
	return (
		<Modal>
			<Modal.Open opens="gifPicker">
				<Button>{setEmoji} Emoji</Button>
			</Modal.Open>
			<Modal.Window name="gifPicker">
				<Heading as="h2">Emoji</Heading>
				<ChatMoreEmojiPickerWithLoader />
			</Modal.Window>
		</Modal>
	);
};

export default ChatMoreModalEmoji;
