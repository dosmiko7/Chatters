import { BiSolidEnvelope } from "react-icons/bi";

import ButtonProfile from "../../ui/ButtonProfile";

const ProfileButtonMessage = () => {
	return (
		<ButtonProfile>
			<BiSolidEnvelope style={{ fontSize: "2.4rem" }} />
			<span>Write a message</span>
		</ButtonProfile>
	);
};

export default ProfileButtonMessage;
