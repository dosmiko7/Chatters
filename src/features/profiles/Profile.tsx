import styled from "styled-components";

import useProfile from "./useProfile";
import ProfileInformation from "./ProfileInformation";
import ProfileFriends from "./ProfileFriends";
import Spinner from "../../ui/Spinner";
import ProfileFormModal from "./form/ProfileFormModal";

const StyledProfile = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 100%;
	background-color: var(--color-primary-300);
`;

const Edit = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	transform: translate(50%, 50%);
`;

// TODO: Add Pen button to edit information if it is our own profile
// TODO: Add contact button (disabled/non seen if it is our profile)
const Profile = () => {
	const { profileData, status } = useProfile();

	if (status === "error" || profileData === undefined) return <div>Error</div>;
	else if (status === "pending") return <Spinner />;

	return (
		<StyledProfile>
			<ProfileInformation profileData={profileData} />
			<ProfileFriends profileData={profileData} />
			<Edit>
				<ProfileFormModal />
			</Edit>
		</StyledProfile>
	);
};

export default Profile;
