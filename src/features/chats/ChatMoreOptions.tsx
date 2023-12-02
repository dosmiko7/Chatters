import styled from "styled-components";
import { Button } from "../../ui/Button";
import Heading from "../../ui/Heading";
import { flexRow } from "../../style/Templates";

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
		</div>
	);
};

export default ChatMoreOptions;
