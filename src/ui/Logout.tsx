import styled from "styled-components";
import { BiSolidLogOut } from "react-icons/bi";

import { displayInfo } from "../style/Templates";
import { Button } from "./Button";

const LogoutButton = styled(Button)`
	${displayInfo({ message: "Logout", position: "right" })}
`;

// TODO: Add logout logic
const Logout = () => {
	return (
		<LogoutButton
			variant="menu"
			size="medium"
		>
			<BiSolidLogOut />
		</LogoutButton>
	);
};

export default Logout;
