import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { IFriendData } from "../../services/firestore/userApi";
import { flexRow } from "../../style/Templates";
import ProfileFriendElement from "./ProfileFriendElement";

const Grid = styled.div`
	${flexRow}
	flex-wrap: wrap;
	padding-top: var(--padding-md);
	gap: 1rem;
`;

const ProfileFriendsGrid = ({ friendsList }: { friendsList: IFriendData[] }) => {
	const navigate = useNavigate();

	return (
		<Grid>
			{friendsList.map((friend) => {
				return (
					<ProfileFriendElement
						key={friend.id}
						avatar={friend.avatar}
						nickname={friend.nickname}
						onClickHandler={() => navigate(`/profile/${friend.id}`)}
					/>
				);
			})}
		</Grid>
	);
};

export default ProfileFriendsGrid;
