import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { displayInfo, flexCentered } from "../style/Templates";

const StyledLogo = styled.div`
	${flexCentered}
	width: 5rem;

	${displayInfo({ message: "Move to dashboard", position: "right" })};
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
		<StyledLogo role="logo">
			<Image
				src="/logo.png"
				alt="Logo"
				onClick={() => navigate("/dashboard")}
			/>
		</StyledLogo>
	);
};

export default Logo;
