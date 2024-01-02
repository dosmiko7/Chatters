import { useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import styled from "styled-components";

import useLoggedUser from "../authentication/useLoggedUser";
import { displayInfo } from "../../style/Templates";
import Button from "../../ui/Button";

const ProfileButton = styled(Button)`
	${displayInfo({ message: "Your profile", position: "right" })}
`;

const ProfileUser = () => {
	const navigate = useNavigate();
	const { loggedUser } = useLoggedUser();

	return (
		<ProfileButton
			variant="menu"
			size="large"
			onClick={() => navigate(`profile/${loggedUser?.uid}`)}
		>
			<BiSolidUser />
		</ProfileButton>
	);
};

export default ProfileUser;
