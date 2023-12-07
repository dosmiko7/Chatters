import { useParams } from "react-router-dom";
import { BiUserMinus, BiUserPlus } from "react-icons/bi";

import useFriendUpdate from "./useFriendUpdate";
import ButtonProfile from "../../ui/ButtonProfile";

// TODO: Logic for adding friends
// TODO: Change fixed loggedUserId to dynamic one
const ProfileButtonFriend = ({ friends }: { friends: string[] }) => {
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	const { updateFriend } = useFriendUpdate();
	const { userId: profileId } = useParams();

	if (loggedUserId === undefined || profileId === undefined) return null;
	if (loggedUserId === profileId) return null;

	const onAddFriendHandler = () => {
		updateFriend({ userId: loggedUserId, friendId: profileId, mode: "add" });
	};

	if (friends.includes(loggedUserId))
		return (
			<ButtonProfile>
				<BiUserMinus style={{ fontSize: "2.4rem" }} />
				<span>Remove friend</span>
			</ButtonProfile>
		);
	else
		return (
			<ButtonProfile onClick={() => onAddFriendHandler()}>
				<BiUserPlus style={{ fontSize: "2.4rem" }} />
				<span>Add to friends</span>
			</ButtonProfile>
		);
};

export default ProfileButtonFriend;
