import { useRef, useLayoutEffect, Suspense } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import { IChatElement } from "./useChat";
import { themes } from "../../data/themes";
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

	const themeObject = themes.find((obj) => obj.theme === `${setTheme}`);
	const fontColor = themeObject?.fontColor || "var(--color-white-100)";

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
		<StyledChatWindow aria-label="Chat window">
			<Suspense fallback={<Spinner />}>
				<List<IChatElement>
					data={chat}
					render={(message: IChatElement, index: number) => {
						const renderPhoto = index + 1 === chat.length || chat[index].userId !== chat[index + 1].userId;
						return (
							<ChatMessage
								key={index}
								currentUser={currentUser}
								{...message}
								theme={{ name: setTheme, fontColor }}
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
