import styled from "styled-components";
import Options from "../../ui/Options";
import SettingsOptionsReset from "./SettingsOptionsReset";
import { flexCentered } from "../../style/Templates";

const StyledOptionsContainer = styled(Options.Container)`
	${flexCentered};
`;

const StyledOptionsList = styled(Options.List)`
	width: 40%;
	align-items: center;
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
