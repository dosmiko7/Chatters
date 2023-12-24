import styled from "styled-components";

import { IDocumentData } from "../../services/firestore/userApi";
import Heading from "../../ui/Heading";
import ProfileFriendsGrid from "./ProfileFriendsGrid";

const StyledProfileFriends = styled.div`
	padding: var(--padding-sm);
	border-left: var(--border-thin);
`;

// TODO: Make an error UI element for every component where error can occury
const ProfileFriends = ({ profileData }: { profileData: IDocumentData }) => {
	const { nickname, friends_list } = profileData.data;

	let renderEl;
	if (!profileData) renderEl = <div>Something went wrong</div>;
	else if (!friends_list.length)
		renderEl = (
			<Heading
				as="h3"
				center
			>
				{nickname} doesn't have friends.
			</Heading>
		);
	else renderEl = <ProfileFriendsGrid friendsList={friends_list} />;

	return (
		<StyledProfileFriends>
			<Heading as="h2">Friends of {nickname}</Heading>
			{renderEl}
		</StyledProfileFriends>
	);
};

export default ProfileFriends;
