import styled from "styled-components";

const Paragraph = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;

	@media only screen and (width <= 860px) {
		font-size: 1.8rem;
	}
`;

export default Paragraph;
