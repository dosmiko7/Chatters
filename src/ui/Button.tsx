import styled from "styled-components";

export const Button = styled.button`
	padding: var(--padding-sm);
	border-radius: var(--border-radius-md);
	color: var(--color-primary-0);
	background-color: var(--color-secondary-400);
	font-weight: var(--font-weight-medium);

	transition: all 0.3s;

	&:hover {
		background-color: var(--color-secondary-100);
	}
`;
