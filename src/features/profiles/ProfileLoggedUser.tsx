import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useLoggedUser from "../../context/useLoggedUser";
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
				size="4rem"
				src={loggedUser?.photoURL}
				onClick={() => navigate(`profile/${loggedUser?.uid}`)}
			/>
		</StyledWrapper>
	);
};

export default ProfileLoggedUser;
