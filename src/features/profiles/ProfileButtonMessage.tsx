import { BiSolidEnvelope } from "react-icons/bi";

import ButtonProfile from "../../ui/ButtonProfile";

// TODO: Change fixed loggedUserId to dynamic one
const ProfileButtonMessage = ({
	isFriend,
	loggedUserId,
	profileId,
}: {
	isFriend: boolean;
	loggedUserId: string;
	profileId: string;
}) => {
	if (loggedUserId === profileId) return null;

	const onMessageHandler = () => {};

	if (isFriend)
		return (
			<ButtonProfile onClick={() => onMessageHandler()}>
				<BiSolidEnvelope style={{ fontSize: "2.4rem" }} />
				<span>Write a message</span>
			</ButtonProfile>
		);
	else return null;
};

export default ProfileButtonMessage;
