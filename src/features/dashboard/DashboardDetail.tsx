import styled from "styled-components";

import { flexColumn } from "../../style/Templates";
import { Container } from "../../ui/Container";
import DashboardButtons from "./DashboardButtons";
import DashboardList from "./DashboardList";
import Heading from "../../ui/Heading";

const Main = styled.main`
	${flexColumn};
	align-items: center;
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
