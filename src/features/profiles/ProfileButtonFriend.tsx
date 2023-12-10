import { toast } from "react-hot-toast";
import { BiUserMinus, BiUserPlus } from "react-icons/bi";

import useFriendUpdate from "./useFriendUpdate";
import ButtonProfile from "../../ui/ButtonProfile";
import ToasterWarning from "../../ui/ToasterWarning";
import { toasterWarningOptions } from "../../ui/ToasterWarning.options";

const message = "Removing a user from your friends list will also delete all messages with that user.";

// TODO: Logic for adding friends
// TODO: Change fixed loggedUserId to dynamic one
const ProfileButtonFriend = ({
	isFriend,
	loggedUserId,
	profileId,
}: {
	isFriend: boolean;
	loggedUserId: string;
	profileId: string;
}) => {
	const { updateFriend } = useFriendUpdate({ userId: loggedUserId, profileId });
	if (loggedUserId === profileId) return null;

	const onAddFriendHandler = () => {
		updateFriend("add");
	};

	const onRemoveFriendHandler = () => {
		toast(
			(t) => (
				<ToasterWarning
					t={t}
					confirmHandler={() => updateFriend("remove")}
					message={message}
				/>
			),
			toasterWarningOptions
		);
	};

	if (isFriend)
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
