import styled from "styled-components";

import { flexRow } from "../../style/Templates";
import Heading from "../../ui/Heading";
import ChatMoreOpen from "./more/ChatMoreOpen";

const StyledChatTitle = styled.div`
	${flexRow};
	justify-content: space-between;
	border-bottom: 1px solid var(--color-primary-500);
`;

interface ChatTitleProps {
	nickname: string | undefined;
	handlerOpen: () => void;
}

const DEFAULT_NICKNAME = "friend";

const ChatTitle = ({ nickname, handlerOpen }: ChatTitleProps) => {
	return (
		<StyledChatTitle aria-label="Chat title">
			<Heading as="h2">Chat with {nickname || DEFAULT_NICKNAME}</Heading>
			<ChatMoreOpen handlerOpen={handlerOpen} />
		</StyledChatTitle>
	);
};

export default ChatTitle;
