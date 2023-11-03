import styled from "styled-components";
import { BiUserPlus } from "react-icons/bi";

import { Button } from "./Button";
import { findUser } from "../services/firestore";

const StyledButton = styled(Button)`
	font-size: 2.2rem;
`;

//TODO: If user click on this button in Chats should show option to search for other users
const SearchUsers = () => {
	const handleOnClick = () => {
		findUser("John Doe");
	};

	return (
		<StyledButton
			variant="menu"
			size="medium"
			onClick={handleOnClick}
		>
			<BiUserPlus />
		</StyledButton>
	);
};

export default SearchUsers;
