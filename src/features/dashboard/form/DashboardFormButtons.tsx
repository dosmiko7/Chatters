import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import DashboardFormFile from "./DashboardFormFile";
import DashboardFormGIF from "./DashboardFormGIF";
import DashboardFormSubmit from "./DashboardFormSubmit";

const StyledDashboardFormButtons = styled.div`
	${flexRow};
	font-size: 2rem;
`;

const DashboardFormButtons = () => {
	return (
		<StyledDashboardFormButtons>
			<DashboardFormFile />
			<DashboardFormGIF />
			<DashboardFormSubmit />
		</StyledDashboardFormButtons>
	);
};

export default DashboardFormButtons;
