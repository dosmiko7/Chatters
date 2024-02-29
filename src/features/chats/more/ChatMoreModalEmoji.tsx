import { Suspense, lazy } from "react";

import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import ThreeDots from "../../../ui/ThreeDots";
const ChatMoreEmojiPicker = lazy(() => import("./ChatMoreEmojiPicker"));

const ChatMoreModalEmoji = ({ setEmoji }: { setEmoji: string }) => {
	return (
		<Modal>
			<Modal.Open opens="gifPicker">
				<Button>{setEmoji} Emoji</Button>
			</Modal.Open>
			<Modal.Window name="gifPicker">
				<Suspense fallback={<ThreeDots />}>
					<Heading as="h2">Emoji</Heading>
					<ChatMoreEmojiPicker />
				</Suspense>
			</Modal.Window>
		</Modal>
	);
};

export default ChatMoreModalEmoji;
