import styled from "styled-components";
import useProfile from "./useProfile";
import ProfileInformation from "./ProfileInformation";
import ProfileFriends from "./ProfileFriends";

const StyledProfile = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 100%;
	background-color: var(--color-primary-300);
`;

const Profile = () => {
	const { profileData, status } = useProfile();
	console.log(profileData);

	if (status === "error" || !profileData) return <div>Error</div>;

	return (
		<StyledProfile>
			<ProfileInformation profileData={profileData} />
			<ProfileFriends />
		</StyledProfile>
	);
};

export default Profile;
