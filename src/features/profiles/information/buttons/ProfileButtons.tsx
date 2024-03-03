import { useParams } from "react-router-dom";
import styled from "styled-components";

import useLoggedUser from "../../../authentication/useLoggedUser";
import { IDocumentData } from "../../../../services/firestore/userApi";
import { flexRow } from "../../../../style/Templates";
import formatDate from "../../../../utils/formatDate";
import ProfileButtonFriend from "./ProfileButtonFriend";
import ProfileButtonMessage from "./ProfileButtonMessage";
import ProfileFormModal from "../../form/ProfileFormModal";

const StyledButtons = styled.div`
	margin-top: 1rem;
	${flexRow};
	gap: 1rem;
`;
const ProfileButtons = ({ profileData }: { profileData: IDocumentData }) => {
	const { nickname, avatar, background, lastLoggedIn, lastLoggedOut, friends_list } = profileData.data;
	const { loggedUser } = useLoggedUser();
	const { userId: profileId } = useParams();

	if (loggedUser?.uid === undefined || profileId === undefined) return null;

	const chatData = {
		nickname,
		avatar,
		isActive: lastLoggedIn > lastLoggedOut,
		lastSeen: formatDate(lastLoggedOut),
		friendId: profileId,
		userId: loggedUser.uid,
	};

	const isFriend = friends_list.some((friend) => friend.id === loggedUser.uid);
	const isLoggedUserProfile = loggedUser.uid === profileId;

	return (
		<StyledButtons>
			{isLoggedUserProfile && <ProfileFormModal images={{ avatar, background }} />}
			<ProfileButtonFriend
				isFriend={isFriend}
				loggedUserId={loggedUser.uid}
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
