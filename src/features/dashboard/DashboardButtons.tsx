import styled from "styled-components";
import DashboardFormModal from "./form/DashboardFormModal";
import { flexRow } from "../../style/Templates";

const StyledDashboardButtons = styled.div`
	${flexRow};
	width: 100%;
	justify-content: space-between;
`;

const DashboardButtons = () => {
	return (
		<StyledDashboardButtons>
			<DashboardFormModal />
		</StyledDashboardButtons>
	);
};

export default DashboardButtons;
