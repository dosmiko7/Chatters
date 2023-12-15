import styled from "styled-components";
import DashboardFormModal from "./form/DashboardFormModal";
import { flexRow } from "../../style/Templates";

const StyledDashboardButtons = styled.div`
	${flexRow};
`;

const DashboardButtons = () => {
	return (
		<StyledDashboardButtons>
			<DashboardFormModal />
		</StyledDashboardButtons>
	);
};

export default DashboardButtons;
