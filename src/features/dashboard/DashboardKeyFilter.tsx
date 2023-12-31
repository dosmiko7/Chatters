import { useContext } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import { DashboardOptionsContext } from "../../context/DashboardOptionsContext";
import useSmallerResolution from "../../hooks/useSmallerResolution";
import SearchesWindow from "../searches/SearchesWindow";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import FlexRow from "../../ui/FlexRow";
import DashboardKeyRemove from "./DashboardKeyRemove";
import { displayInfo } from "../../style/Templates";

const StyledFlexRow = styled(FlexRow)`
	gap: 0.6rem;
`;

const SearchButton = styled(Button)`
	${displayInfo({ message: "Search for user's posts", position: "bottom" })};
`;

const DashboardKeyFilter = () => {
	const { isSmaller } = useSmallerResolution({ width: 860 });
	const { setKey } = useContext(DashboardOptionsContext);

	const getUsersPosts = (userId: string) => {
		setKey(userId);
	};

	return (
		<StyledFlexRow>
			<Modal>
				<Modal.Open opens="searches">
					<SearchButton
						variant={isSmaller ? "menu" : undefined}
						size={isSmaller ? "large" : undefined}
					>
						<BiSearch />
						{!isSmaller && <span>Search</span>}
					</SearchButton>
				</Modal.Open>
				<Modal.Window name="searches">
					<SearchesWindow
						onClickHandler={getUsersPosts}
						heading="Find user's posts"
					/>
				</Modal.Window>
			</Modal>
			<DashboardKeyRemove />
		</StyledFlexRow>
	);
};

export default DashboardKeyFilter;
