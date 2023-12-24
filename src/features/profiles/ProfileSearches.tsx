import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { displayInfo } from "../../style/Templates";
import Searches from "../searches/Searches";

const StyledWrapper = styled.div`
	${displayInfo({ message: "Search profile", position: "right" })};
`;

const ProfileSearches = () => {
	const navigate = useNavigate();

	const navigateToProfile = (userId: string) => {
		navigate(`profile/${userId}`);
	};

	return (
		<StyledWrapper>
			<Searches onClickHandler={navigateToProfile} />
		</StyledWrapper>
	);
};

export default ProfileSearches;
