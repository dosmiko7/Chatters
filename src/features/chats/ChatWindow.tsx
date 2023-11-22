import styled from "styled-components";
import useChat, { IChatElement } from "./useChat";
import List from "../../ui/List";
import ChatMessage from "./ChatMessage";

const StyledChatWindow = styled.div`
	flex-grow: 1;
	padding: 0 5rem;
`;

// TODO: Change for current logged user id
const ChatWindow = () => {
	const currentUser = "ivKwYDsLxLkM34cMKDdw";
	const { chat, error } = useChat();

	return (
		<StyledChatWindow>
			<List<IChatElement>
				data={chat}
				render={(message: IChatElement, index: number) => {
					const renderPhoto = index + 1 === chat.length || chat[index].userId !== chat[index + 1].userId;
					return (
						<ChatMessage
							key={message.createdAt.nanoseconds}
							currentUser={currentUser}
							userId={message.userId}
							renderPhoto={renderPhoto}
							createdAt={message.createdAt}
							nickname={message.nickname}
							avatar={message.avatar}
							message={message.message}
						/>
					);
				}}
			/>
		</StyledChatWindow>
	);
};

export default ChatWindow;
