import { BiSolidLogOut } from "react-icons/bi";
import styled from "styled-components";
import { Button } from "./Button";
import { flexCentered } from "../style/Templates";

const StyledButton = styled(Button)`
	${flexCentered};
	font-size: 1.8rem;
	background-color: transparent;
`;

// TODO: Add logout logic

const Logout = () => {
	return (
		<StyledButton>
			<BiSolidLogOut />
		</StyledButton>
	);
};

export default Logout;
