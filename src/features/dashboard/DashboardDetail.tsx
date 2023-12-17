import styled from "styled-components";

import { flexColumn } from "../../style/Templates";
import { Container } from "../../ui/Container";
import DashboardButtons from "./DashboardButtons";
import DashboardList from "./DashboardList";
import Heading from "../../ui/Heading";

const Main = styled.main`
	${flexColumn};
	gap: 2rem;
	align-items: center;
	margin: 0 auto;
	width: 60%;
	max-width: 60%;
`;

const DashboardDetail = () => {
	return (
		<Container>
			<Heading as="h2">Dashboard</Heading>
			<Main>
				<DashboardButtons />
				<DashboardList />
			</Main>
		</Container>
	);
};

export default DashboardDetail;
