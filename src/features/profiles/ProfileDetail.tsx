import styled from "styled-components";

import useProfile from "./useProfile";
import ProfileInformation from "./ProfileInformation";
import ProfileFriends from "./ProfileFriends";
import Spinner from "../../ui/Spinner";

const StyledProfile = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 100%;
`;

// TODO: Add Pen button to edit information if it is our own profile
// TODO: Add contact button (disabled/non seen if it is our profile)
const ProfileDetail = () => {
	const { profileData, status } = useProfile();

	if (status === "error" || profileData === undefined) return <div>Error</div>;
	else if (status === "pending") return <Spinner />;

	return (
		<StyledProfile>
			<ProfileInformation profileData={profileData} />
			<ProfileFriends profileData={profileData} />
		</StyledProfile>
	);
};

export default ProfileDetail;
