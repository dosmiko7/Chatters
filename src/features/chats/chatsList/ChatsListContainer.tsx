import styled from "styled-components";
import { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

import useSmallerResolution from "../../../hooks/useSmallerResolution";
import { breakpoints } from "../../../style/GlobalStyles";
import { flexColumn, flexRow } from "../../../style/Templates";
import Heading from "../../../ui/Heading";
import Button from "../../../ui/Button";
import ChatsList from "./ChatsList";

const StyledChatsListContainer = styled.div`
	${flexColumn};
	max-height: 100%;
	width: 100%;
	max-width: 100%;

	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		width: 70%;
		max-width: 70%;
	}
`;

const Box = styled.div`
	${flexRow};
	align-items: center;
	justify-content: space-between;
`;

const ChatsListContainer = () => {
	const { isSmaller } = useSmallerResolution({ width: 680 });
	const [listDisplayed, setListDisplayed] = useState<boolean>(true);

	const buttonSymbol = listDisplayed ? <BiChevronDown /> : <BiChevronUp />;

	const handleOnClick = () => {
		setListDisplayed((prev) => !prev);
	};

	return (
		<StyledChatsListContainer>
			{!isSmaller && (
				<Box>
					<Heading as="h3">Chats</Heading>
					<Button
						onClick={handleOnClick}
						variant="menu"
						size="small"
					>
						{buttonSymbol}
					</Button>
				</Box>
			)}

			{listDisplayed && <ChatsList />}
		</StyledChatsListContainer>
	);
};

export default ChatsListContainer;
