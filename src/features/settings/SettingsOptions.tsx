import styled from "styled-components";

import { flexRow } from "../../style/Templates";
import Options from "../../ui/Options";
import SettingsOptionsReset from "./SettingsOptionsReset";
import SettingsOptionsDelete from "./SettingsOptionsDelete";

const StyledOptionsContainer = styled(Options.Container)`
	${flexRow};
	justify-content: center;
	width: 90%;
	margin: 5rem auto;
`;

const StyledOptionsList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
	gap: 2rem;
`;

const SettingsOptions = () => {
	return (
		<StyledOptionsContainer>
			<StyledOptionsList>
				<SettingsOptionsReset />
				<SettingsOptionsDelete />
			</StyledOptionsList>
		</StyledOptionsContainer>
	);
};

export default SettingsOptions;
