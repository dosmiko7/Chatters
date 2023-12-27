import { useState } from "react";
import styled from "styled-components";
import { HiSortDescending, HiSortAscending } from "react-icons/hi";

import useDashboardOptions from "../../context/useDashboardOptions";
import { flexRow } from "../../style/Templates";
import DashboardFilterButton from "./DashboardFilterButton";

const StyledDashboardSortFilters = styled.div`
	${flexRow};
	font-size: 2rem;
	gap: 1rem;
	color: var(--font-color);
`;

const DashboardSortFilters = () => {
	const { setOrder } = useDashboardOptions();
	const [selectedOption, setSelectedOption] = useState<"asc" | "desc">("desc");

	const onFilterOptionClick = (order: "asc" | "desc") => {
		setSelectedOption(order);
		setOrder(order);
	};

	return (
		<StyledDashboardSortFilters>
			<DashboardFilterButton
				infoMsg="From oldest"
				icon={<HiSortAscending />}
				onClickHandler={() => onFilterOptionClick("asc")}
				isActive={selectedOption === "asc"}
			/>
			<DashboardFilterButton
				infoMsg="From newest"
				icon={<HiSortDescending />}
				onClickHandler={() => onFilterOptionClick("desc")}
				isActive={selectedOption === "desc"}
			/>
		</StyledDashboardSortFilters>
	);
};

export default DashboardSortFilters;
