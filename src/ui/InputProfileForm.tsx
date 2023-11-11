import styled from "styled-components";

const InputProfileForm = styled.input`
	border-radius: var(--border-radius-xsm);
	border: 1px solid transparent;
	padding: var(--padding-sm);
	margin: var(--padding-xsm) 0;
	width: 100%;
	color: var(--color-primary-0);
	background-color: var(--color-primary-500);

	&:hover {
		background-color: transparent;
		border: 1px solid var(--color-secondary-400);
	}
`;

export default InputProfileForm;
