import styled from "styled-components";

import { flexCentered } from "../style/Templates";

const GoogleLogin = styled.div.attrs({
	as: "button",
})`
	${flexCentered}
	width: fit-content;
	margin: 2rem auto;
	font-weight: var(--font-weight-medium);
	background-color: var(--color-primary-25);
	border-radius: var(--border-radius-md);
	color: var(--color-primary-500);
	padding: var(--padding-sm);
	border: 1px solid transparent;
	gap: 0.6rem;

	&:hover {
		cursor: pointer;
		background-color: var(--color-primary-0);
		border: 1px solid var(--color-secondary-400);
	}

	& :first-child {
		font-size: 2.6rem;
	}
`;

export default GoogleLogin;
