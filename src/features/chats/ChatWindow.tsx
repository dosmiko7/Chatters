import { useRef, useLayoutEffect, Suspense } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import { IChatElement } from "./useChat";
import List from "../../ui/List";
import ChatMessage from "./ChatMessage";
import Spinner from "../../ui/Spinner";

const StyledChatWindow = styled.div`
	height: 100%;
	flex-grow: 1;
	padding: 0 5rem;
	overflow-y: scroll;
	transform: translateZ(0);
	-webkit-transform: translateZ(0);
`;

const ChatWindow = ({
	currentUser,
	chat,
	setTheme,
	error,
}: {
	currentUser: string;
	chat: IChatElement[];
	setTheme: string;
	error: boolean;
}) => {
	const bottomRef = useRef<null | HTMLDivElement>(null);

	useLayoutEffect(() => {
		const scrollElement = () => {
			if (bottomRef.current) {
				bottomRef.current.scrollIntoView({
					behavior: "auto",
				});
			}
		};
		scrollElement();
	}, [bottomRef, chat]);

	if (error) toast.error("Something went wrong with fetching messages.");

	return (
		<StyledChatWindow>
			<Suspense fallback={<Spinner />}>
				<List<IChatElement>
					data={chat}
					render={(message: IChatElement, index: number) => {
						const renderPhoto = index + 1 === chat.length || chat[index].userId !== chat[index + 1].userId;
						return (
							<ChatMessage
								key={message.createdAt.nanoseconds}
								type={message.type}
								fileName={message.fileName}
								currentUser={currentUser}
								userId={message.userId}
								createdAt={message.createdAt}
								nickname={message.nickname}
								avatar={message.avatar}
								message={message.message}
								theme={setTheme}
								renderPhoto={renderPhoto}
							/>
						);
					}}
				/>
			</Suspense>
			<div ref={bottomRef}></div>
		</StyledChatWindow>
	);
};

export default ChatWindow;
