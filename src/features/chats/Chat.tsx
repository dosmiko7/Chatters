import styled from "styled-components";
import ChatWindow from "./ChatWindow";
import ChatForm from "./form/ChatForm";
import { flexColumn } from "../../style/Templates";
import { Container } from "../../ui/Container";

const StyledChat = styled(Container)`
	${flexColumn};
	height: 100%;
`;

const Chat = () => {
	return (
		<StyledChat>
			<ChatWindow />
			<ChatForm />
		</StyledChat>
	);
};

export default Chat;
