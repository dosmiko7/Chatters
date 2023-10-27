import styled from "styled-components";

export const Input = styled.input`
	border-radius: var(--border-radius-md);
	padding: var(--padding-sm);
	background-color: var(--color-primary-25);
	border: 1px solid transparent;

	&:hover {
		background-color: var(--color-primary-0);
		border: 1px solid var(--color-secondary-400);
	}
`;
