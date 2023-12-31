import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useLoggedUser from "../authentication/useLoggedUser";
import { displayInfo } from "../../style/Templates";
import Avatar from "../../ui/Avatar";

const StyledWrapper = styled.div`
	${displayInfo({ message: "Your profile", position: "right" })}
`;

const ProfileLoggedUser = () => {
	const navigate = useNavigate();
	const { loggedUser } = useLoggedUser();

	return (
		<StyledWrapper>
			<Avatar
				size="5rem"
				src={loggedUser?.photoURL}
				onClick={() => navigate(`profile/${loggedUser?.uid}`)}
			/>
		</StyledWrapper>
	);
};

export default ProfileLoggedUser;
