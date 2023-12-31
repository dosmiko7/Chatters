import { useContext } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import { DashboardOptionsContext } from "../../context/DashboardOptionsContext";
import SearchesWindow from "../searches/SearchesWindow";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import FlexRow from "../../ui/FlexRow";
import DashboardKeyRemove from "./DashboardKeyRemove";

const StyledFlexRow = styled(FlexRow)`
	gap: 0.6rem;
`;

const DashboardKeyFilter = () => {
	const { setKey } = useContext(DashboardOptionsContext);

	const getUsersPosts = (userId: string) => {
		setKey(userId);
	};

	return (
		<StyledFlexRow>
			<Modal>
				<Modal.Open opens="searches">
					<Button>
						<BiSearch />
						<span>Search</span>
					</Button>
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
