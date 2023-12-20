import { useNavigate } from "react-router-dom";

import Searches from "../searches/Searches";

const ProfileSearches = () => {
	const navigate = useNavigate();

	const navigateToProfile = (userId: string) => {
		navigate(`profile/${userId}`);
	};

	return <Searches onClickHandler={navigateToProfile} />;
};

export default ProfileSearches;
