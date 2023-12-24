import styled from "styled-components";

import { centeredAbsolute } from "../style/Templates";

const ContainerImageEditor = styled.div`
	position: relative;
	transition: var(--transition-all-3);
	font-weight: var(--font-weight-medium);

	& label {
		${centeredAbsolute};
		background-color: var(--color-secondary-400);
		padding: var(--padding-sm) var(--padding-md);
		border-radius: var(--border-radius-sm);
		display: none;
	}

	&:hover {
		& img {
			filter: blur(2px);
		}

		& label {
			display: block;
			cursor: pointer;
		}
	}
`;

export default ContainerImageEditor;
