import styled from "styled-components";
import { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

import { flexRow } from "../../../style/Templates";
import Heading from "../../../ui/Heading";
import Button from "../../../ui/Button";
import ChatsList from "./ChatsList";

const Box = styled.div`
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
		<div>
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
		</div>
	);
};

export default ChatsListContainer;
