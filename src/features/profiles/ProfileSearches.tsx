import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Searches from "../searches/Searches";
import { displayInfo } from "../../style/Templates";

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
