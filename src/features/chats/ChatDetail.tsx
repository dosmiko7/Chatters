import { useState } from "react";
import styled from "styled-components";

import useChat from "./useChat";
import { IChatStateProps } from "../../pages/Chat";
import { flexColumn, flexRow } from "../../style/Templates";
import ChatForm from "./form/ChatForm";
import Container from "../../ui/Container";
import ChatWindow from "./ChatWindow";
import ChatTitle from "./ChatTitle";
import ChatMore from "./more/ChatMore";
import Wrapper from "../../ui/Wrapper";

const StyledWrapper = styled(Wrapper)`
	${flexRow};
	height: 100%;
	position: relative;
`;

const StyledChat = styled(Container)`
	${flexColumn};
	max-height: 100%;
	width: 75%;
	flex-grow: 1;
`;

const ChatDetail = ({ state }: { state: IChatStateProps }) => {
	const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
	const { chat, emoji, theme, error } = useChat();

	const { nickname, avatar, isActive, lastSeen, friendId, userId } = state;
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
					setTheme={theme}
				/>
				<ChatForm setEmoji={emoji} />
			</StyledChat>
			{isMoreOpen && (
				<ChatMore
					handlerClose={handleOpenMore}
					data={data}
					setEmoji={emoji}
					setTheme={theme}
				/>
			)}
		</StyledWrapper>
	);
};

export default ChatDetail;
