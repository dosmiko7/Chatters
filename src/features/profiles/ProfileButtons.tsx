import styled from "styled-components";
import ProfileButtonAdd from "./ProfileButtonAdd";
import { flexRow } from "../../style/Templates";
import ProfileButtonMessage from "./ProfileButtonMessage";
import ProfileFormModal from "./form/ProfileFormModal";

const StyledButtons = styled.div`
	${flexRow};
	gap: 1rem;
`;

// TODO: Display ProfileAdd and ProfileMessage when its not current user's profile
// TODO: Display ProfileFormModal if it is current user's profile
const ProfileButtons = () => {
	return (
		<StyledButtons>
			<ProfileFormModal />
			<ProfileButtonAdd />
			<ProfileButtonMessage />
		</StyledButtons>
	);
};

export default ProfileButtons;
