import styled from "styled-components";

import { breakpoints } from "../../style/GlobalStyles";
import { flexColumn } from "../../style/Templates";
import Container from "../../ui/Container";
import DashboardButtons from "./buttons/DashboardButtons";
import DashboardList from "./list/DashboardList";
import Heading from "../../ui/Heading";
import DashboardOptionsProvider from "../../context/DashboardOptionsContext";

const Main = styled.main`
	${flexColumn};
	gap: 2rem;
	align-items: center;
	margin: 0 auto;
	width: 60%;
	max-width: 60%;

	@media only screen and (width <= ${breakpoints.tabletScreen}) {
		width: 90%;
		max-width: 90%;
	}
`;

const DashboardDetail = () => {
	return (
		<Container>
			<Heading as="h2">Dashboard</Heading>
			<DashboardOptionsProvider>
				<Main>
					<DashboardButtons />
					<DashboardList />
				</Main>
			</DashboardOptionsProvider>
		</Container>
	);
};

export default DashboardDetail;
