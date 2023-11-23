import styled from "styled-components";
import ChatWindow from "./ChatWindow";
import ChatForm from "./form/ChatForm";
import { flexColumn, flexRow } from "../../style/Templates";
import { Container } from "../../ui/Container";
import { Wrapper } from "../../ui/Wrapper";
import ChatTitle from "./ChatTitle";

const StyledWrapper = styled(Wrapper)`
	${flexRow};
`;

const StyledChat = styled(Container)`
	${flexColumn};
	max-height: 100vh;
`;

const Chat = () => {
	return (
		<StyledWrapper>
			<StyledChat>
				<ChatTitle />
				<ChatWindow />
				<ChatForm />
			</StyledChat>
		</StyledWrapper>
	);
};

export default Chat;
