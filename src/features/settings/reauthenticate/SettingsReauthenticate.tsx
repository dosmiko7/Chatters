import styled from "styled-components";

import { flexColumn } from "../../../style/Templates";
import Paragraph from "../../../ui/Paragraph";
import SettingsReauthenticateGoogle from "./SettingsReauthenticateGoogle";
import SettingsReauthenticateEmail from "./SettingsReauthenticateEmail";

const StyledSettingsReauthenticate = styled.div`
	${flexColumn};
	gap: 1rem;
`;

// TODO: Add custom hooks to handle reauth with email/password and google
const SettingsReauthenticate = () => {
	return (
		<StyledSettingsReauthenticate>
			<Paragraph>
				Deleting your account will result in the loss of all data entered on our website. This also applies to chats you
				have participated in.
			</Paragraph>
			<SettingsReauthenticateEmail />
			<SettingsReauthenticateGoogle />
		</StyledSettingsReauthenticate>
	);
};

export default SettingsReauthenticate;
