import { useParams } from "react-router-dom";
import styled from "styled-components";

import { IDocumentData } from "../../services/firestore/userApi";
import { flexRow } from "../../style/Templates";
import formatDate from "../../utils/formatDate";
import ProfileButtonFriend from "./ProfileButtonFriend";
import ProfileButtonMessage from "./ProfileButtonMessage";
import ProfileFormModal from "./form/ProfileFormModal";

const StyledButtons = styled.div`
	margin-top: 1rem;
	${flexRow};
	gap: 1rem;
`;
// TODO: Change to dynamic logged user id
const ProfileButtons = ({ profileData }: { profileData: IDocumentData }) => {
	const { nickname, avatar, lastLoggedIn, lastLoggedOut, friends_list } = profileData.data;
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	const { userId: profileId } = useParams();

	if (loggedUserId === undefined || profileId === undefined) return null;

	const chatData = {
		nickname,
		avatar,
		isActive: lastLoggedIn > lastLoggedOut,
		lastSeen: formatDate(lastLoggedOut),
		friendId: profileId,
		userId: loggedUserId,
	};

	const isFriend = friends_list.some((friend) => friend.id === loggedUserId);
	const isLoggedUserProfile = loggedUserId === profileId;

	return (
		<StyledButtons>
			<ProfileFormModal isLoggedUserProfile={isLoggedUserProfile} />
			<ProfileButtonFriend
				isFriend={isFriend}
				loggedUserId={loggedUserId}
				profileId={profileId}
			/>
			<ProfileButtonMessage
				isFriend={isFriend}
				chatData={chatData}
			/>
		</StyledButtons>
	);
};

export default ProfileButtons;
