import styled from "styled-components";

import ProfileButtonFriend from "./ProfileButtonFriend";
import { flexRow } from "../../style/Templates";
import ProfileButtonMessage from "./ProfileButtonMessage";
import ProfileFormModal from "./form/ProfileFormModal";

const StyledButtons = styled.div`
	margin-top: 1rem;
	${flexRow};
	gap: 1rem;
`;

// TODO: Display ProfileAdd and ProfileMessage when its not current user's profile
// TODO: Display ProfileFormModal if it is current user's profile
const ProfileButtons = ({ friends }: { friends: string[] }) => {
	return (
		<StyledButtons>
			<ProfileFormModal />
			<ProfileButtonFriend friends={friends} />
			<ProfileButtonMessage />
		</StyledButtons>
	);
};

export default ProfileButtons;
