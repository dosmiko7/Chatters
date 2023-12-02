import styled from "styled-components";
import { Button } from "../../../ui/Button";

const StyledButton = styled(Button)`
	margin-left: 1rem;
`;

const ChatFormEmoji = ({ emoji }: { emoji: string }) => {
	return <StyledButton variant="menu">{emoji}</StyledButton>;
};

export default ChatFormEmoji;
