import styled from "styled-components";
import useChat from "./useChat";

const StyledChatWindow = styled.div`
	flex-grow: 1;
`;

// TODO: Change for current logged user id
const ChatWindow = () => {
	const userId = "ivKwYDsLxLkM34cMKDdw";
	const { chat, error } = useChat();

	return <StyledChatWindow>ChatWindow</StyledChatWindow>;
};

export default ChatWindow;
