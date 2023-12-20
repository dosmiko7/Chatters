import { useState, useContext } from "react";
import styled from "styled-components";
import { HiSortDescending, HiSortAscending } from "react-icons/hi";

import { DashboardOptionsContext } from "../../context/DashboardOptions";
import { flexRow } from "../../style/Templates";
import { Button } from "../../ui/Button";

const StyledDashboardSortFilters = styled.div`
	${flexRow};
	font-size: 2rem;
	gap: 1rem;
	color: var(--font-color);
`;

const FilterButton = styled(Button)`
	width: 5rem;
	height: 5rem;
`;

const DashboardSortFilters = () => {
	const { setOrder } = useContext(DashboardOptionsContext);
	const [selectedOption, setSelectedOption] = useState<"asc" | "desc">("desc");

	const onFilterOptionClick = (order: "asc" | "desc") => {
		setSelectedOption(order);
		setOrder(order);
	};

	return (
		<StyledDashboardSortFilters>
			<FilterButton
				variant="menu"
				style={{ border: `2px solid ${selectedOption === "asc" ? "var(--color-secondary-400)" : "transparent"}` }}
				onClick={() => onFilterOptionClick("asc")}
			>
				<HiSortAscending />
			</FilterButton>
			<FilterButton
				variant="menu"
				style={{ border: `2px solid ${selectedOption === "desc" ? "var(--color-secondary-400)" : "transparent"}` }}
				onClick={() => onFilterOptionClick("desc")}
			>
				<HiSortDescending />
			</FilterButton>
		</StyledDashboardSortFilters>
	);
};

export default DashboardSortFilters;
