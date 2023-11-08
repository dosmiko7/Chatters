import styled from "styled-components";

import { Button, ButtonProps } from "./Button";
import { flexRow } from "../style/Templates";

const ButtonProfile = styled(Button)<ButtonProps>`
	${flexRow};
	align-items: center;
	gap: 0.6rem;
	border-radius: var(--border-radius-xsm);
`;

ButtonProfile.defaultProps = {
	size: "small",
};

export default ButtonProfile;
