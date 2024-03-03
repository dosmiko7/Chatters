import { toast } from "react-hot-toast";
import { BiUserMinus, BiUserPlus } from "react-icons/bi";

import useFriendUpdate from "./useFriendUpdate";
import Button from "../../ui/Button";
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
			<Button
				variant="profile"
				size="small"
				onClick={() => onRemoveFriendHandler()}
			>
				<BiUserMinus style={{ fontSize: "2.4rem" }} />
				<span>Remove friend</span>
			</Button>
		);
	else
		return (
			<Button
				variant="profile"
				size="small"
				onClick={() => onAddFriendHandler()}
			>
				<BiUserPlus style={{ fontSize: "2.4rem" }} />
				<span>Add to friends</span>
			</Button>
		);
};

export default ProfileButtonFriend;
