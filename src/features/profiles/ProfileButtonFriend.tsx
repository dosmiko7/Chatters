import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BiUserMinus, BiUserPlus } from "react-icons/bi";

import useFriendUpdate from "./useFriendUpdate";
import ButtonProfile from "../../ui/ButtonProfile";
import { IFriendData } from "../../services/firestore";
import ProfileFriendWarning from "./ProfileFriendWarning";

const toastOptions = {
	duration: 14000,
	style: {
		backgroundColor: "var(--color-primary-400)",
		boxShadow: "var(--shadow-sm)",
		maxWidth: "300px",
	},
};

// TODO: Logic for adding friends
// TODO: Change fixed loggedUserId to dynamic one
const ProfileButtonFriend = ({ friends }: { friends: IFriendData[] }) => {
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	const { userId: profileId } = useParams();
	const { updateFriend } = useFriendUpdate({ userId: loggedUserId, profileId });

	if (loggedUserId === undefined || profileId === undefined) return null;
	if (loggedUserId === profileId) return null;

	const onAddFriendHandler = () => {
		updateFriend("add");
	};

	const onRemoveFriendHandler = () => {
		toast(
			(t) => (
				<ProfileFriendWarning
					t={t}
					removeHandler={() => updateFriend("remove")}
				/>
			),
			toastOptions
		);
	};

	const containsFriend = friends.some((friend) => friend.id === loggedUserId);
	if (containsFriend)
		return (
			<ButtonProfile onClick={() => onRemoveFriendHandler()}>
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
