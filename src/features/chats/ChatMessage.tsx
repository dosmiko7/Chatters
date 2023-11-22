import styled from "styled-components";
import { ListElement } from "../../ui/ListElement";
import { IChatElement } from "./useChat";

const StyledMessage = styled.div`
	max-width: 45%;
`;

interface IChatMessageProps extends IChatElement {
	currentUser: string;
	renderPhoto: boolean;
}

const ChatMessage = (props: IChatMessageProps) => {
	const { userId, createdAt, nickname, avatar, currentUser, renderPhoto } = props;
	const position = userId === currentUser ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" };

	return <ListElement style={position}>ChatMessage</ListElement>;
};

export default ChatMessage;
