import styled from "styled-components";

import { flexRow } from "../../style/Templates";
import DashboardFormModal from "./form/DashboardFormModal";
import DashboardFilters from "./DashboardFilters";

const StyledDashboardButtons = styled.div`
	${flexRow};
	width: 100%;
	justify-content: space-between;
`;

const DashboardButtons = () => {
	return (
		<StyledDashboardButtons>
			<DashboardFormModal />
			<DashboardFilters />
		</StyledDashboardButtons>
	);
};

export default DashboardButtons;
