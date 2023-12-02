import styled from "styled-components";
import { Button } from "../../../ui/Button";

const StyledButton = styled(Button)`
	margin-left: 1rem;
`;

const ChatFormEmoji = () => {
	return <StyledButton variant="menu">💪</StyledButton>;
};

export default ChatFormEmoji;
