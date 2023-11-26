import styled from "styled-components";
import { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

import { Wrapper } from "../../../ui/Wrapper";
import Heading from "../../../ui/Heading";
import { flexRow } from "../../../style/Templates";
import { Button } from "../../../ui/Button";
import ChatsList from "./ChatsList";

const StyledChatsContainer = styled(Wrapper)``;

const Box = styled(Wrapper)`
	${flexRow};
	align-items: center;
	justify-content: space-between;
`;

const ChatsListContainer = () => {
	const [listDisplayed, setListDisplayed] = useState<boolean>(true);

	const buttonSymbol = listDisplayed ? <BiChevronDown /> : <BiChevronUp />;

	const handleOnClick = () => {
		setListDisplayed((prev) => !prev);
	};

	return (
		<StyledChatsContainer>
			<Box>
				<Heading as="h3">Private Chats</Heading>
				<Button
					onClick={handleOnClick}
					variant="menu"
					size="small"
				>
					{buttonSymbol}
				</Button>
			</Box>
			{listDisplayed && <ChatsList />}
		</StyledChatsContainer>
	);
};

export default ChatsListContainer;
