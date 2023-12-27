import styled from "styled-components";

import useProfile from "./useProfile";
import ProfileInformation from "./ProfileInformation";
import ProfileFriends from "./ProfileFriends";
import Spinner from "../../ui/Spinner";
import ErrorMessage from "../../ui/ErrorMessage";

const StyledProfile = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 100%;
`;

const ProfileDetail = () => {
	const { profileData, status } = useProfile();

	if (status === "error" || profileData === undefined) return <ErrorMessage>Something went wrong</ErrorMessage>;
	else if (status === "pending") return <Spinner />;

	return (
		<StyledProfile>
			<ProfileInformation profileData={profileData} />
			<ProfileFriends profileData={profileData} />
		</StyledProfile>
	);
};

export default ProfileDetail;
