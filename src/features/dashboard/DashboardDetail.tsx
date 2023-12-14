import styled from "styled-components";
import DashboardButtons from "./DashboardButtons";
import DashboardList from "./DashboardList";

const StyledDashboard = styled.div``;

const DashboardDetail = () => {
	return (
		<StyledDashboard>
			<DashboardButtons />
			<DashboardList />
		</StyledDashboard>
	);
};

export default DashboardDetail;
