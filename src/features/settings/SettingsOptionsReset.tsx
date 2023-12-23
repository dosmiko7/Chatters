import styled from "styled-components";

import { Button } from "../../ui/Button";
import Options from "../../ui/Options";

const StyledOption = styled(Options.Option)`
	width: 100%;
	justify-content: center;
	padding: var(--padding-xsm);
	border-radius: var(--border-radius-md);
`;

const SettingsOptionsReset = () => {
	return (
		<StyledOption>
			<Button>Reset your password</Button>
		</StyledOption>
	);
};

export default SettingsOptionsReset;
