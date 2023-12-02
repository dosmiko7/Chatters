import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

import Modal from "../../ui/Modal";
import { Button } from "../../ui/Button";
import Heading from "../../ui/Heading";

const ChatMoreGIFPicker = ({ emoji }: { emoji: string }) => {
	const onEmojiClickHandler = (emoji: EmojiClickData) => {
		console.log(emoji);
	};

	return (
		<Modal>
			<Modal.Open opens="gifPicker">
				<Button variant="menu">{emoji}</Button>
			</Modal.Open>
			<Modal.Window name="gifPicker">
				<Heading
					as="h2"
					center
				>
					Emoji
				</Heading>
				<EmojiPicker
					onEmojiClick={onEmojiClickHandler}
					theme={Theme.DARK}
					width="100%"
					height="90%"
				/>
			</Modal.Window>
		</Modal>
	);
};

export default ChatMoreGIFPicker;
