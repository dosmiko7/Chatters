import styled from "styled-components";

import Heading from "../../../ui/Heading";
import { flexRow } from "../../../style/Templates";
import ChatMoreModalEmoji from "./ChatMoreModalEmoji";
import ChatMoreModalTheme from "./ChatMoreModalTheme";

const Options = styled.div``;

const OptionsList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Option = styled.li`
	${flexRow}
	align-items: center;
	justify-content: center;
	gap: 0.4rem;

	&:hover {
		backdrop-filter: contrast(90%);
	}
`;

const ChatMoreOptions = ({ setEmoji, setTheme }: { setEmoji: string; setTheme: string }) => {
	return (
		<Options>
			<Heading as="h3">Chat customization</Heading>
			<OptionsList>
				<Option key={setEmoji}>
					<ChatMoreModalEmoji setEmoji={setEmoji} />
				</Option>
				<Option key={setTheme}>
					<ChatMoreModalTheme setTheme={setTheme} />
				</Option>
			</OptionsList>
		</Options>
	);
};

export default ChatMoreOptions;
