import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { IDocumentData } from "../../services/firestore";
import { flexRow } from "../../style/Templates";
import ProfileFriendElement from "./ProfileFriendElement";

const Grid = styled.div`
	${flexRow}
	flex-wrap: wrap;
	padding-top: var(--padding-md);
	gap: 1rem;
`;

const ProfileFriendsGrid = ({ friendsData }: { friendsData: IDocumentData[] }) => {
	const navigate = useNavigate();

	return (
		<Grid>
			{friendsData.map((friend) => {
				return (
					<ProfileFriendElement
						key={friend.id}
						avatar={friend.data.avatar}
						nickname={friend.data.nickname}
						onClickHandler={() => navigate(`/profile/${friend.id}`)}
					/>
				);
			})}
		</Grid>
	);
};

export default ProfileFriendsGrid;
