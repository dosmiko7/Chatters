import styled from "styled-components";

import { IDocumentData } from "../../services/firestore/userApi";
import Heading from "../../ui/Heading";
import ProfileFriendsGrid from "./ProfileFriendsGrid";
import ErrorMessage from "../../ui/ErrorMessage";

const StyledProfileFriends = styled.div`
	padding: var(--padding-sm);
	border-left: var(--border-thin);
	height: 100%;
	max-height: 100%;
	overflow: scroll;

	@media only screen and (width <= 860px) {
		overflow: unset;
	}
`;

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
