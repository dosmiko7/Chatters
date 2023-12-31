import styled from "styled-components";

const Input = styled.input`
	border-radius: var(--border-radius-md);
	padding: var(--padding-sm);
	background-color: var(--color-primary-500);
	border: 1px solid transparent;
	color: var(--font-color);

	&:hover {
		border: 1px solid var(--color-secondary-400);
	}

	&:focus {
		background-color: transparent;
	}
`;

export default Input;
