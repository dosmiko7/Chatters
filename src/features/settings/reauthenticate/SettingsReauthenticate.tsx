import styled from "styled-components";

import { flexColumn } from "../../../style/Templates";
import Paragraph from "../../../ui/Paragraph";
import SettingsReauthenticateForm from "./SettingsReauthenticateForm";
import SettingsReauthenticateGoogle from "./SettingsReauthenticateGoogle";

const StyledSettingsReauthenticate = styled.div`
	${flexColumn};
	gap: 1rem;
`;

const SettingsReauthenticate = () => {
	return (
		<StyledSettingsReauthenticate>
			<Paragraph>
				Deleting your account will result in the loss of all data entered on our website. This also applies to chats you
				have participated in.
			</Paragraph>
			<SettingsReauthenticateForm />
			<SettingsReauthenticateGoogle />
		</StyledSettingsReauthenticate>
	);
};

export default SettingsReauthenticate;
