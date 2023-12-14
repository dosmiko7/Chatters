import DashboardButtons from "./DashboardButtons";
import DashboardList from "./DashboardList";
import Heading from "../../ui/Heading";
import { Container } from "../../ui/Container";

const DashboardDetail = () => {
	return (
		<Container>
			<Heading as="h2">Dashboard</Heading>
			<DashboardButtons />
			<DashboardList />
		</Container>
	);
};

export default DashboardDetail;
