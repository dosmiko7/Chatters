import { lazy, useState } from "react";
import styled from "styled-components";

import useChat from "./useChat";
import { IChatStateProps } from "../../pages/Chat";
import { breakpoints } from "../../style/GlobalStyles";
import { flexColumn, flexRow } from "../../style/Templates";
import Container from "../../ui/Container";
import Wrapper from "../../ui/Wrapper";
import ChatTitle from "./ChatTitle";
import ChatForm from "./form/ChatForm";
import ChatWindow from "./window/ChatWindow";
import withLoader from "../../hocs/withLoader";
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

const StyledFallbackContainer = styled(Container)`
	width: 25%;

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		position: absolute;
		height: 100%;
		width: 100%;
	}
`;

const FallbackContainer = (children: React.ReactNode) => {
	return <StyledFallbackContainer>{children}</StyledFallbackContainer>;
};

const ChatMoreWithLoader = withLoader({
	componentToSuspense: ChatMore,
	containerForLoader: FallbackContainer,
});

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
				<ChatMoreWithLoader
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
