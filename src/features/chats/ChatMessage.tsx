import { IChatElement } from "./useChat";

const ChatMessage = ({ props: IChatElement, logg }) => {
	const { userId, createdAt, nickname, avatar } = props;

	return <div>ChatMessage</div>;
};

export default ChatMessage;
