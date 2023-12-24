import styled from "styled-components";

import { centeredAbsolute } from "../style/Templates";

export const FormWindow = styled.div`
	${centeredAbsolute}
	padding: var(--padding-md);
	background-color: var(--color-primary-400);
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-md);
	width: 50rem;
	height: 60rem;
`;

export default FormWindow;
