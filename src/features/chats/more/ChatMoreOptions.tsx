import styled from "styled-components";

import Heading from "../../../ui/Heading";
import { flexRow } from "../../../style/Templates";
import ChatMoreGIFPicker from "./ChatMoreModalEmoji";

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
					<ChatMoreGIFPicker emoji={emoji} />
					<p>Change emoji</p>
				</Option>
			</ul>
		</div>
	);
};

export default ChatMoreOptions;
