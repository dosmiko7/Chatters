import styled from "styled-components";
import { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

import { Wrapper } from "../../ui/Wrapper";
import Heading from "../../ui/Heading";
import { flexRow } from "../../style/Templates";
import { Button } from "../../ui/Button";
import PrivateChatsList from "./PrivateChatsList";

const StyledPrivateChats = styled(Wrapper)``;

const Box = styled(Wrapper)`
	${flexRow};
	align-items: center;
	justify-content: space-between;
`;

const PrivateChats = () => {
	const [listDisplayed, setListDisplayed] = useState<boolean>(true);

	const buttonSymbol = listDisplayed ? <BiChevronDown /> : <BiChevronUp />;

	const handleOnClick = () => {
		setListDisplayed((prev) => !prev);
	};

	return (
		<StyledPrivateChats>
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
			{listDisplayed && <PrivateChatsList />}
		</StyledPrivateChats>
	);
};

export default PrivateChats;
