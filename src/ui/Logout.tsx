import styled from "styled-components";
import { BiSolidLogOut } from "react-icons/bi";

import useSignOut from "../features/authentication/useSignOut";
import { displayInfo } from "../style/Templates";
import Button from "./Button";

const LogoutButton = styled(Button)`
	${displayInfo({ message: "Logout", position: "right" })}
`;

// TODO: Add logout logic
const Logout = () => {
	const { signOut, status } = useSignOut();

	return (
		<LogoutButton
			variant="menu"
			size="medium"
			onClick={() => signOut()}
			disabled={status === "pending"}
		>
			<BiSolidLogOut />
		</LogoutButton>
	);
};

export default Logout;
