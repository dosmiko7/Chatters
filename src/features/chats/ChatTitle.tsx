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

interface ChatTitleProps {
	nickname: string | undefined;
	handlerOpen: () => void;
}

const ChatTitle = ({ nickname, handlerOpen }: ChatTitleProps) => {
	const defaultNickname = "friend";

	return (
		<StyledChatTitle>
			<Heading as="h2">Chat with {nickname || defaultNickname}</Heading>
			<Button
				variant="menu"
				onClick={handlerOpen}
			>
				<BsThreeDots style={{ fontSize: "2rem" }} />
			</Button>
		</StyledChatTitle>
	);
};

export default ChatTitle;
