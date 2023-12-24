import styled from "styled-components";

import { ephasis } from "../style/Templates";

const Link = styled.a`
	${ephasis};
	text-decoration: none;
	font-weight: var(--font-weight-medium);

	&:hover {
		cursor: pointer;
	}
`;

export default Link;
