import styled from "styled-components";
import { flexCentered } from "../style/Templates";

const StyledLogo = styled.div`
	${flexCentered}
	width: 5rem;
`;
const Image = styled.img`
	max-width: 100%;
`;

const Logo = () => {
	return (
		<StyledLogo>
			<Image
				src="logo.png"
				alt="Logo"
			/>
		</StyledLogo>
	);
};

export default Logo;
