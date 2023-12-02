import styled from "styled-components";
import { Button } from "../../ui/Button";
import Heading from "../../ui/Heading";
import { flexRow } from "../../style/Templates";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

const Option = styled.li`
	${flexRow}
	align-items: center;
	gap: 0.4rem;
`;

const ChatMoreOptions = ({ emoji }: { emoji: string }) => {
	const onEmojiClickHandler = (emoji: EmojiClickData) => {
		console.log(emoji);
	};

	return (
		<div>
			<Heading as="h3">Chat customization</Heading>
			<ul>
				<Option>
					<Button variant="menu">{emoji}</Button>
					<p>Change emoji</p>
				</Option>
			</ul>
			<EmojiPicker
				onEmojiClick={onEmojiClickHandler}
				theme={Theme.DARK}
			/>
		</div>
	);
};

export default ChatMoreOptions;
