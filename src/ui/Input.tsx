import styled from "styled-components";

export const Input = styled.input`
	border-radius: var(--border-radius-md);
	padding: var(--padding-sm);
	border: 1px solid #000;
	background-color: var(--color-primary-25);

	&:hover {
		background-color: var(--color-primary-0);
		border: 1px solid var(--color-secondary-400);
	}
`;
