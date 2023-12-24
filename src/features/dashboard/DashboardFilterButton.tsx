import { ReactNode } from "react";
import styled from "styled-components";

import { displayInfo } from "../../style/Templates";
import Button from "../../ui/Button";

interface IFilterButtonProps {
	infoMsg: string;
	isActive: boolean;
}

const FilterButton = styled(Button)<IFilterButtonProps>`
	width: 5rem;
	height: 5rem;
	border: 2px solid;
	border-color: ${(props) => (props.isActive ? "var(--color-secondary-400)" : "transparent")};
	${(props) => displayInfo({ message: props.infoMsg, position: "left" })};
`;

const DashboardFilterButton = ({
	icon,
	onClickHandler,
	isActive,
	infoMsg,
}: {
	icon: ReactNode;
	onClickHandler: () => void;
	isActive: boolean;
	infoMsg: string;
}) => {
	return (
		<FilterButton
			variant="menu"
			infoMsg={infoMsg}
			isActive={isActive}
			onClick={onClickHandler}
		>
			{icon}
		</FilterButton>
	);
};

export default DashboardFilterButton;
