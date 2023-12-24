import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";

import { displayInfo } from "../../../style/Templates";
import Button from "../../../ui/Button";

const ChatMoreOpenButton = styled(Button)`
	${displayInfo({ message: "More", position: "left" })}
	font-size: 2rem;
`;

const ChatMoreOpen = ({ handlerOpen }: { handlerOpen: () => void }) => {
	return (
		<ChatMoreOpenButton
			variant="menu"
			onClick={handlerOpen}
		>
			<BsThreeDots />
		</ChatMoreOpenButton>
	);
};

export default ChatMoreOpen;
