import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import DashboardFormModal from "../form/DashboardFormModal";
import DashboardFilters from "./DashboardFilters";
import DashboardKeyFilter from "./DashboardKeyFilter";
import Wrapper from "../../../ui/Wrapper";

const StyledDashboardButtons = styled(Wrapper)`
	${flexRow};
	width: 100%;
	justify-content: space-between;
`;

const DashboardButtons = () => {
	return (
		<StyledDashboardButtons aria-label="Dashboard buttons">
			<DashboardFormModal />
			<DashboardKeyFilter />
			<DashboardFilters />
		</StyledDashboardButtons>
	);
};

export default DashboardButtons;
