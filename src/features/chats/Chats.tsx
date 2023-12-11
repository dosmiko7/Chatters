import styled from "styled-components";
import { BiChat } from "react-icons/bi";

import Heading from "../../ui/Heading";
import { centeredAbsolute, flexColumn } from "../../style/Templates";

const StyledChats = styled.div`
	${flexColumn};
	${centeredAbsolute};
	align-items: center;
`;

const IconContainer = styled.div`
	font-size: 12rem;
`;

const Chats = () => {
	return (
		<StyledChats>
			<IconContainer>
				<BiChat />
			</IconContainer>
			<Heading as="h1">No chat selected</Heading>
		</StyledChats>
	);
};

export default Chats;
