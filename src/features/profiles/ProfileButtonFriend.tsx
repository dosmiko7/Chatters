import { toast } from "react-hot-toast";
import { BiUserMinus, BiUserPlus } from "react-icons/bi";

import useFriendUpdate from "./useFriendUpdate";
import ButtonProfile from "../../ui/ButtonProfile";
import ToasterWarning from "../../ui/ToasterWarning";
import { toasterWarningOptions } from "../../ui/ToasterWarning.options";

const MESSAGE = "Are you sure you want to remove this user from your friends list?";

const ProfileButtonFriend = ({
	isFriend,
	loggedUserId,
	profileId,
}: {
	isFriend: boolean;
	loggedUserId: string;
	profileId: string;
}) => {
	const { updateFriend, status } = useFriendUpdate({ userId: loggedUserId, profileId });
	if (loggedUserId === profileId) return null;

	if (status === "error") toast.error("The operation failed");

	const onAddFriendHandler = () => {
		updateFriend("add");
	};

	const onRemoveFriendHandler = () => {
		toast(
			(t) => (
				<ToasterWarning
					t={t}
					confirmHandler={() => updateFriend("remove")}
					message={MESSAGE}
				/>
			),
			toasterWarningOptions({ id: "deleteFriend" })
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
