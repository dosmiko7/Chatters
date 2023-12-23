import styled from "styled-components";

import Options from "../../ui/Options";
import SettingsOptionsReset from "./SettingsOptionsReset";
import { flexRow } from "../../style/Templates";

const StyledOptionsContainer = styled(Options.Container)`
	width: 90%;
	margin: 5rem auto;
`;

const StyledOptionsList = styled(Options.List)`
	${flexRow};
	gap: 2rem;
`;

const SettingsOptions = () => {
	return (
		<StyledOptionsContainer>
			<StyledOptionsList>
				<SettingsOptionsReset />
			</StyledOptionsList>
		</StyledOptionsContainer>
	);
};

export default SettingsOptions;
