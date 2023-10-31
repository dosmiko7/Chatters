import { BiUserPlus } from "react-icons/bi";
import { Button } from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
	font-size: 2.2rem;
`;

//TODO: If user click on this button in Chats should show option to search for other users
const SearchUsers = () => {
	return (
		<StyledButton
			variant="menu"
			size="medium"
		>
			<BiUserPlus />
		</StyledButton>
	);
};

export default SearchUsers;
