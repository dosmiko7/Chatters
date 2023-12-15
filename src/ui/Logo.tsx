import styled from "styled-components";
import { flexCentered } from "../style/Templates";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
	${flexCentered}
	width: 5rem;
`;
const Image = styled.img`
	max-width: 100%;

	&:hover {
		cursor: pointer;
	}
`;

const Logo = () => {
	const navigate = useNavigate();

	return (
		<StyledLogo>
			<Image
				src="logo.png"
				alt="Logo"
				onClick={() => navigate("/dashboard")}
			/>
		</StyledLogo>
	);
};

export default Logo;
