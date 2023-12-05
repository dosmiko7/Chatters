import styled from "styled-components";

import Heading from "../../../ui/Heading";
import { flexRow } from "../../../style/Templates";
import ChatMoreModalEmoji from "./ChatMoreModalEmoji";
import ChatMoreModalTheme from "./ChatMoreModalTheme";

const Option = styled.li`
	${flexRow}
	align-items: center;
	gap: 0.4rem;
`;

const ChatMoreOptions = ({ emoji }: { emoji: string }) => {
	return (
		<div>
			<Heading as="h3">Chat customization</Heading>
			<ul>
				<Option>
					<ChatMoreModalEmoji emoji={emoji} />
					<p>Change emoji</p>
				</Option>
				<Option>
					<ChatMoreModalTheme />
					<p>Change theme</p>
				</Option>
			</ul>
		</div>
	);
};

export default ChatMoreOptions;
