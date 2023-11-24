import styled from "styled-components";

const IconContainerForLabel = styled.div`
	display: flex;
	padding: var(--padding-sm);
	border-radius: var(--border-radius-circle);
	transition: var(--transition-all-3);
	&:hover {
		background-color: var(--color-secondary-100);
		cursor: pointer;
	}
`;

export default IconContainerForLabel;
