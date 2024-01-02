import styled from "styled-components";

import { breakpoints } from "../style/GlobalStyles";

const Paragraph = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		font-size: 1.8rem;
	}
`;

export default Paragraph;
