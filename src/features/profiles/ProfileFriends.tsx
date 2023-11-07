import styled from "styled-components";

import { IDocumentData } from "../../services/firestore";
import Heading from "../../ui/Heading";
import useFriends from "./useFriends";
import ProfileFriendsGrid from "./ProfileFriendsGrid";

const StyledProfileFriends = styled.div`
	padding: var(--padding-sm);
	border-left: var(--border-thin);
`;

// TODO: Make an error UI element for every component where error can occury
const ProfileFriends = ({ profileData }: { profileData: IDocumentData }) => {
	const friends = profileData.data.friends_list;
	const friendsData = useFriends(friends);

	return (
		<StyledProfileFriends>
			<Heading as="h2">Friends of {profileData.data.nickname}</Heading>
			{!friendsData.length ? (
				<Heading
					as="h3"
					center
				>
					{profileData.data.nickname} has not friends.
				</Heading>
			) : (
				<ProfileFriendsGrid friendsData={friendsData} />
			)}
		</StyledProfileFriends>
	);
};

export default ProfileFriends;
