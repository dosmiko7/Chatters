//import { useParams } from "react-router-dom";
import { BiSolidEnvelope } from "react-icons/bi";

import ButtonProfile from "../../ui/ButtonProfile";

// TODO: Change fixed loggedUserId to dynamic one
const ProfileButtonMessage = () => {
	//const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	//const { userId: profileId } = useParams();

	return (
		<ButtonProfile>
			<BiSolidEnvelope style={{ fontSize: "2.4rem" }} />
			<span>Write a message</span>
		</ButtonProfile>
	);
};

export default ProfileButtonMessage;
