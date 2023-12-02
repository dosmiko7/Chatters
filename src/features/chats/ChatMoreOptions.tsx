import styled from "styled-components";
import { Button } from "../../ui/Button";
import Heading from "../../ui/Heading";
import { flexRow } from "../../style/Templates";
import EmojiPicker, { Theme } from "emoji-picker-react";

const Option = styled.li`
	${flexRow}
	align-items: center;
	gap: 0.4rem;
`;

const ChatMoreOptions = () => {
	const currentEmoji = "🎨";

	return (
		<div>
			<Heading as="h3">Chat customization</Heading>
			<ul>
				<Option>
					<Button variant="menu">{currentEmoji}</Button>
					<p>Change emoji</p>
				</Option>
			</ul>
			<EmojiPicker theme={Theme.DARK} />
		</div>
	);
};

export default ChatMoreOptions;
