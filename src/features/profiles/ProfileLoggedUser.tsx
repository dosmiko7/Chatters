import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { displayInfo } from "../../style/Templates";
import Avatar from "../../ui/Avatar";

const StyledWrapper = styled.div`
	${displayInfo({ message: "Your profile", position: "right" })}
`;

//TODO: Change for dynamic logged user id
const ProfileLoggedUser = () => {
	const navigate = useNavigate();
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";

	return (
		<StyledWrapper>
			<Avatar
				size="4rem"
				onClick={() => navigate(`profile/${loggedUserId}`)}
			/>
		</StyledWrapper>
	);
};

export default ProfileLoggedUser;
