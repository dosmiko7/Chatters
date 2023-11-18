import styled from "styled-components";

import { IDocumentData } from "../../services/firestore";
import Heading from "../../ui/Heading";
import useFriends from "./useFriends";
import ProfileFriendsGrid from "./ProfileFriendsGrid";
import Spinner from "../../ui/Spinner";

const StyledProfileFriends = styled.div`
	padding: var(--padding-sm);
	border-left: var(--border-thin);
`;

// TODO: Make an error UI element for every component where error can occury
const ProfileFriends = ({ profileData }: { profileData: IDocumentData }) => {
	const friends = profileData.data.friends_list;
	const { friendsData, status } = useFriends(friends);

	let renderEl;
	if (status === "pending") renderEl = <Spinner />;
	else if (!friendsData || status === "error") renderEl = <div>Something went wrong</div>;
	else if (!friendsData.length)
		renderEl = (
			<Heading
				as="h3"
				center
			>
				{profileData.data.nickname} has not friends.
			</Heading>
		);
	else renderEl = <ProfileFriendsGrid friendsData={friendsData} />;

	return (
		<StyledProfileFriends>
			<Heading as="h2">Friends of {profileData.data.nickname}</Heading>
			{renderEl}
		</StyledProfileFriends>
	);
};

export default ProfileFriends;
