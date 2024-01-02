import styled from "styled-components";

import useProfile from "./useProfile";
import { breakpoints } from "../../style/GlobalStyles";
import { flexColumn, flexRow } from "../../style/Templates";
import ProfileInformation from "./ProfileInformation";
import ProfileFriends from "./ProfileFriends";
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

	if (status === "error") return <ErrorMessage>Something went wrong</ErrorMessage>;
	if (!profileData) return null;
	else if (status === "pending") return <Spinner />;

	return (
		<StyledProfile>
			<ProfileInformation profileData={profileData} />
			<ProfileFriends profileData={profileData} />
		</StyledProfile>
	);
};

export default ProfileDetail;
