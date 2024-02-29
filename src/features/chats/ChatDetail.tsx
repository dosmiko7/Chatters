import { Suspense, lazy, useState } from "react";
import styled from "styled-components";

import useChat from "./useChat";
import { IChatStateProps } from "../../pages/Chat";
import { breakpoints } from "../../style/GlobalStyles";
import { flexColumn, flexRow } from "../../style/Templates";
import ChatForm from "./form/ChatForm";
import Container from "../../ui/Container";
import ChatWindow from "./ChatWindow";
import ChatTitle from "./ChatTitle";
import Wrapper from "../../ui/Wrapper";
import ThreeDots from "../../ui/ThreeDots";
const ChatMore = lazy(() => import("./more/ChatMore"));

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

const FallbackContainer = styled(Container)`
	width: 25%;

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		position: absolute;
		height: 100%;
		width: 100%;
	}
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
				<Suspense
					fallback={
						<FallbackContainer>
							<ThreeDots />
						</FallbackContainer>
					}
				>
					<ChatMore
						handlerClose={handleOpenMore}
						data={data}
						setEmoji={emoji}
						setTheme={theme}
					/>
				</Suspense>
			)}
		</StyledWrapper>
	);
};

export default ChatDetail;
