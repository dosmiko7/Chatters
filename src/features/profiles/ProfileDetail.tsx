import styled from "styled-components";

import useProfile from "./useProfile";
import { breakpoints } from "../../style/GlobalStyles";
import { flexColumn, flexRow } from "../../style/Templates";
import ProfileInformation from "./information/ProfileInformation";
import ProfileFriends from "./friends/ProfileFriends";
import Spinner from "../../ui/Spinner";
import ErrorMessage from "../../ui/ErrorMessage";

const StyledProfile = styled.div`
	${flexRow};
	position: relative;
	height: 100%;
	max-height: 100%;
	width: 100%;
	max-width: 100%;

	& > * {
		width: 50%;
	}

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		${flexColumn};
		overflow: scroll;

		& > * {
			width: 100%;
		}
	}
`;

const ProfileDetail = () => {
	const { profileData, status } = useProfile();

	if (status === "error" || !profileData) return <ErrorMessage>Something went wrong</ErrorMessage>;
	else if (status === "pending") return <Spinner />;

	return (
		<StyledProfile aria-label="Profile">
			<ProfileInformation profileData={profileData} />
			<ProfileFriends profileData={profileData} />
		</StyledProfile>
	);
};

export default ProfileDetail;
