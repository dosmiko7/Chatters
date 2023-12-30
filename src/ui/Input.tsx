import styled from "styled-components";

const Input = styled.input`
	border-radius: var(--border-radius-md);
	padding: var(--padding-sm);
	background-color: var(--color-white-100);
	border: 1px solid transparent;
	color: var(--font-color);

	&:hover {
		border: 1px solid var(--color-secondary-400);
	}
`;

export default Input;
