import styled from "styled-components";
import { IDocumentData } from "../../services/firestore";
import Heading from "../../ui/Heading";
import useFriends from "./useFriends";
import ProfileFriendElement from "./ProfileFriendElement";
import { useNavigate } from "react-router-dom";
import { flexRow } from "../../style/Templates";

const StyledProfileFriends = styled.div`
	padding: var(--padding-sm);
	border-left: var(--border-thin);
`;

const Grid = styled.div`
	${flexRow}
	flex-wrap: wrap;
	padding-top: var(--padding-md);
	gap: 1rem;
`;

// TODO: Make an error UI element for every component where error can occury
const ProfileFriends = ({ profileData }: { profileData: IDocumentData }) => {
	const friends = profileData.data.friends_list;

	const friendsData = useFriends(friends);
	const navigate = useNavigate();

	if (!friendsData) return <div>Error</div>;

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
				<Grid>
					{friendsData.map((friend) => {
						return (
							<ProfileFriendElement
								key={friend.id}
								avatar={friend.data.avatar}
								nickname={friend.data.nickname}
								onClickHandler={() => navigate(`/profile/${profileData.id}`)}
							/>
						);
					})}
				</Grid>
			)}
		</StyledProfileFriends>
	);
};

export default ProfileFriends;
