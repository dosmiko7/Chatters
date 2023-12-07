import { useParams } from "react-router-dom";
import styled from "styled-components";

import ProfileButtonFriend from "./ProfileButtonFriend";
import { flexRow } from "../../style/Templates";
import ProfileButtonMessage from "./ProfileButtonMessage";
import ProfileFormModal from "./form/ProfileFormModal";
import { IFriendData } from "../../services/firestore";

const StyledButtons = styled.div`
	margin-top: 1rem;
	${flexRow};
	gap: 1rem;
`;

// TODO: Display ProfileAdd and ProfileMessage when its not current user's profile
// TODO: Display ProfileFormModal if it is current user's profile
const ProfileButtons = ({ friends }: { friends: IFriendData[] }) => {
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	const { userId: profileId } = useParams();

	if (loggedUserId === undefined || profileId === undefined) return null;

	const isFriend = friends.some((friend) => friend.id === loggedUserId);
	const isLoggedUserProfile = loggedUserId === profileId;

	return (
		<StyledButtons>
			<ProfileFormModal isLoggedUserProfile={isLoggedUserProfile}/>
			<ProfileButtonFriend
				isFriend={isFriend}
				loggedUserId={loggedUserId}
				profileId={profileId}
			/>
			<ProfileButtonMessage
				isFriend={isFriend}
				loggedUserId={loggedUserId}
				profileId={profileId}
			/>
		</StyledButtons>
	);
};

export default ProfileButtons;
