import styled from "styled-components";
import { centeredFlexy } from "../style/Templates";

export const GoogleLogin = styled.div`
	display: flex;
	${centeredFlexy}
	width: fit-content;
	margin: 2rem auto;
	font-weight: var(--font-weight-medium);
	background-color: var(--color-primary-25);
	border-radius: var(--border-radius-md);
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
