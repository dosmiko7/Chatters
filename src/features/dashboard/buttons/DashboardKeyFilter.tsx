import { lazy } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import useSmallerResolution from "../../../hooks/useSmallerResolution";
import useDashboardOptions from "../../../context/useDashboardOptions";
import { displayInfo } from "../../../style/Templates";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import FlexRow from "../../../ui/FlexRow";
import DashboardKeyRemove from "./DashboardKeyRemove";
import withLoader from "../../../hocs/withLoader";
const SearchesWindow = lazy(() => import("../../searches/SearchesWindow"));

const StyledFlexRow = styled(FlexRow)`
	gap: 0.6rem;
`;

const SearchButton = styled(Button)`
	${displayInfo({ message: "Search for user's posts", position: "bottom" })};
`;

const SearchesWindowWithLoader = withLoader({
	componentToSuspense: SearchesWindow,
});

const DashboardKeyFilter = () => {
	const { isSmaller } = useSmallerResolution({ width: 860 });
	const { setKey } = useDashboardOptions();

	const getUsersPosts = (userId: string) => {
		setKey(userId);
	};

	return (
		<StyledFlexRow>
			<Modal>
				<Modal.Open opens="searches">
					{isSmaller ? (
						<SearchButton
							variant="menu"
							size="large"
						>
							<BiSearch />
						</SearchButton>
					) : (
						<SearchButton>
							<BiSearch />
							<span>Search</span>
						</SearchButton>
					)}
				</Modal.Open>
				<Modal.Window name="searches">
					<SearchesWindowWithLoader
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
