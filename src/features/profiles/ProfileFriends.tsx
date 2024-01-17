import styled from "styled-components";

import { IDocumentData } from "../../services/firestore/userApi";
import { breakpoints } from "../../style/GlobalStyles";
import Heading from "../../ui/Heading";
import ProfileFriendsGrid from "./ProfileFriendsGrid";

const StyledProfileFriends = styled.div`
	padding: var(--padding-sm);
	border-left: var(--border-thin);
	height: 100%;
	max-height: 100%;
	overflow: scroll;

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		overflow: unset;
	}
`;

const ProfileFriends = ({ profileData }: { profileData: IDocumentData }) => {
	const { nickname, friends_list } = profileData.data;

	let renderEl;
	if (!friends_list.length)
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
