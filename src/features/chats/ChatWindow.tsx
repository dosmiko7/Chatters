import { useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import useChat, { IChatElement } from "./useChat";
import List from "../../ui/List";
import ChatMessage from "./ChatMessage";

const StyledChatWindow = styled.div`
	height: 100%;
	flex-grow: 1;
	padding: 0 5rem;
	overflow-y: scroll;
`;

// TODO: Change for current logged user id
const ChatWindow = () => {
	const currentUser = "ivKwYDsLxLkM34cMKDdw";
	const { chat, error } = useChat();
	const bottomRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		const scrollElement = () => {
			if (bottomRef.current) {
				bottomRef.current.scrollIntoView();
			}
		};
		scrollElement();
	}, [bottomRef, chat]);

	if (error) toast.error("Something went wrong with fetching messages.");

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
			<div ref={bottomRef}></div>
		</StyledChatWindow>
	);
};

export default ChatWindow;
