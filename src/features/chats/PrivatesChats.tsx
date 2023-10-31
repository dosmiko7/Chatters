import styled from "styled-components";
import { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

import { Wrapper } from "../../ui/Wrapper";
import Heading from "../../ui/Heading";
import { flexRow } from "../../style/Templates";
import { Button } from "../../ui/Button";

const StyledPrivateChats = styled(Wrapper)``;

const Box = styled(Wrapper)`
	${flexRow};
	align-items: center;
	justify-content: space-between;
`;

const PrivateChats = () => {
	const [listDisplayed, setListDisplayed] = useState<boolean>(true);

	const buttonSymbol = listDisplayed ? <BiChevronUp /> : <BiChevronDown />;

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
		</StyledPrivateChats>
	);
};

export default PrivateChats;
