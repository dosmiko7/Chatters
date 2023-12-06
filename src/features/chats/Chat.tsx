import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import useChat from "./useChat";
import { flexColumn, flexRow } from "../../style/Templates";
import ChatForm from "./form/ChatForm";
import { Container } from "../../ui/Container";
import { Wrapper } from "../../ui/Wrapper";
import ChatWindow from "./ChatWindow";
import ChatTitle from "./ChatTitle";
import ChatMore from "./more/ChatMore";

const StyledWrapper = styled(Wrapper)`
	${flexRow};
	height: 100%;
`;

const StyledChat = styled(Container)`
	${flexColumn};
	max-height: 100vh;
	width: 75%;
	flex-grow: 1;
`;

// TODO: Add users' id to chats collection
const Chat = () => {
	const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
	const location = useLocation();
	const { chat, emoji, theme, error } = useChat();
	const { nickname, avatar, isActive, lastSeen, friendId, userId } = location.state;
	const data = { nickname, avatar, isActive, lastSeen, friendId };

	const handleOpenMore = () => {
		setIsMoreOpen((prev) => !prev);
	};

	return (
		<StyledWrapper>
			<StyledChat>
				<ChatTitle
					handlerOpen={handleOpenMore}
					nickname={nickname}
				/>
				<ChatWindow
					currentUser={userId}
					chat={chat}
					error={error}
					theme={theme}
				/>
				<ChatForm emoji={emoji} />
			</StyledChat>
			{isMoreOpen && (
				<ChatMore
					handlerClose={handleOpenMore}
					data={data}
					emoji={emoji}
					theme={theme}
				/>
			)}
		</StyledWrapper>
	);
};

export default Chat;
