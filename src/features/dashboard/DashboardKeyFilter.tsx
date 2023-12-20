import { useContext } from "react";
import styled from "styled-components";
import { BiSearch, BiEraser } from "react-icons/bi";

import { DashboardOptionsContext } from "../../context/DashboardOptions";
import SearchesWindow from "../searches/SearchesWindow";
import Modal from "../../ui/Modal";
import { Button } from "../../ui/Button";
import FlexRow from "../../ui/FlexRow";

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
						<span>Search user's posts</span>
					</Button>
				</Modal.Open>
				<Modal.Window name="searches">
					<SearchesWindow onClickHandler={getUsersPosts} />
				</Modal.Window>
			</Modal>
			<Button
				variant="menu"
				size="large"
				onClick={() => setKey(null)}
			>
				<BiEraser />
			</Button>
		</StyledFlexRow>
	);
};

export default DashboardKeyFilter;
