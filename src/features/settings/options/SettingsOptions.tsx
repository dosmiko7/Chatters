import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import SettingsOptionsReset from "./SettingsOptionsReset";
import SettingsOptionsDelete from "./SettingsOptionsDelete";
import SettingsOptionsTheme from "./SettingsOptionsTheme";

const StyledSettingsOptions = styled.div`
	${flexRow};
	justify-content: center;
	width: 90%;
	margin: 5rem auto;
`;

const StyledOptionsList = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
	gap: 2rem;
`;

const SettingsOptions = () => {
	return (
		<StyledSettingsOptions>
			<StyledOptionsList>
				<SettingsOptionsReset />
				<SettingsOptionsDelete />
				<SettingsOptionsTheme />
			</StyledOptionsList>
		</StyledSettingsOptions>
	);
};

export default SettingsOptions;
