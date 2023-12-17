import styled from "styled-components";
import { HiSortDescending, HiSortAscending } from "react-icons/hi";

import { flexRow } from "../../style/Templates";
import { Button } from "../../ui/Button";

const StyledDashboardFilters = styled.div`
	${flexRow};
	font-size: 2rem;
	color: var(--font-color);
`;

const DashboardFilters = () => {
	return (
		<StyledDashboardFilters>
			<Button variant="menu">
				<HiSortAscending />
			</Button>
			<Button variant="menu">
				<HiSortDescending />
			</Button>
		</StyledDashboardFilters>
	);
};

export default DashboardFilters;
