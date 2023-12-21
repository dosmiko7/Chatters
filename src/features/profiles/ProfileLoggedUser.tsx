import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Avatar } from "../../ui/Avatar";
import { displayInfo } from "../../style/Templates";

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
