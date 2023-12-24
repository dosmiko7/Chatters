import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

import useChatCustomization from "./useChatCustomization";
import useModal from "../../../hooks/useModal";

const ChatMoreEmojiPicker = () => {
	const { changeCustomization } = useChatCustomization();
	const { close } = useModal();

	const onEmojiClickHandler = (emoji: EmojiClickData) => {
		changeCustomization({ emoji: emoji.emoji }, { onSuccess: () => close() });
	};

	return (
		<EmojiPicker
			onEmojiClick={onEmojiClickHandler}
			theme={Theme.DARK}
			width="100%"
			height="90%"
		/>
	);
};

export default ChatMoreEmojiPicker;
