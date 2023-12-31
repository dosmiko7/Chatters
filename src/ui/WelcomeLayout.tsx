import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { flexCentered, flexColumn, flexRow } from "../style/Templates";
import Footer from "./Footer";
import WelcomeBanner from "./WelcomeBanner";

const StyledWelcomeLayout = styled.div`
	${flexColumn};
	height: 100dvh;
	width: 100dvw;
	background-color: var(--color-primary-300);

	@media only screen and (width <= 860px) {
		height: calc(100dvh + 10rem);
	}
`;

const Main = styled.main`
	${flexRow};
	align-items: center;
	justify-content: space-around;
	height: 90%;

	@media only screen and (width <= 860px) {
		${flexColumn};
	}
`;

const FormBox = styled.div`
	${flexCentered};
	width: 40%;

	@media only screen and (width <= 860px) {
		width: 70%;
	}

	@media only screen and (width <= 480px) {
		width: 90%;
	}
`;

const WelcomeLayout = () => {
	return (
		<StyledWelcomeLayout>
			<Main>
				<WelcomeBanner />
				<FormBox>
					<Outlet />
				</FormBox>
			</Main>
			<Footer />
		</StyledWelcomeLayout>
	);
};

export default WelcomeLayout;
