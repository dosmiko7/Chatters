import styled from "styled-components";

import { BsThreeDots } from "react-icons/bs";
import { Button } from "../../ui/Button";
import Heading from "../../ui/Heading";
import { flexRow } from "../../style/Templates";

const StyledChatTitle = styled.div`
	${flexRow};
	justify-content: space-between;
	border-bottom: 1px solid var(--color-primary-500);
`;

const ChatTitle = () => {
	return (
		<StyledChatTitle>
			<Heading as="h2">Chat with X</Heading>
			<Button variant="menu">
				<BsThreeDots style={{ fontSize: "2rem" }} />
			</Button>
		</StyledChatTitle>
	);
};

export default ChatTitle;
