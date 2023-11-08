import styled from "styled-components";
import ProfileAdd from "./ProfileButtonAdd";
import { flexRow } from "../../style/Templates";
import ProfileButtonMessage from "./ProfileButtonMessage";

const StyledButtons = styled.div`
	${flexRow};
	gap: 1rem;
`;

const ProfileButtons = () => {
	return (
		<StyledButtons>
			<ProfileAdd />
			<ProfileButtonMessage />
		</StyledButtons>
	);
};

export default ProfileButtons;
