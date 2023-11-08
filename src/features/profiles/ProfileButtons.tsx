import styled from "styled-components";
import ProfileAdd from "./ProfileButtonAdd";
import { flexColumn } from "../../style/Templates";
import ProfileButtonMessage from "./ProfileButtonMessage";

const StyledButtons = styled.div`
	${flexColumn}
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
