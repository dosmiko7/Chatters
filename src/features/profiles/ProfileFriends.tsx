import styled from "styled-components";

import { IDocumentData } from "../../services/firestore/userApi";
import Heading from "../../ui/Heading";
import ProfileFriendsGrid from "./ProfileFriendsGrid";
import ErrorMessage from "../../ui/ErrorMessage";

const StyledProfileFriends = styled.div`
	padding: var(--padding-sm);
	border-left: var(--border-thin);
	height: 100dvh;
	max-height: 100dvh;
	overflow: scroll;
`;

// TODO: Make an error UI element for every component where error can occury
const ProfileFriends = ({ profileData }: { profileData: IDocumentData }) => {
	const { nickname, friends_list } = profileData.data;

	let renderEl;
	if (!profileData) renderEl = <ErrorMessage>Something went wrong</ErrorMessage>;
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
