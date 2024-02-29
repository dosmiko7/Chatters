import { Suspense, lazy } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import useSmallerResolution from "../../hooks/useSmallerResolution";
import useDashboardOptions from "../../context/useDashboardOptions";
import { displayInfo } from "../../style/Templates";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import FlexRow from "../../ui/FlexRow";
import DashboardKeyRemove from "./DashboardKeyRemove";
import ThreeDots from "../../ui/ThreeDots";
const SearchesWindow = lazy(() => import("../searches/SearchesWindow"));

const StyledFlexRow = styled(FlexRow)`
	gap: 0.6rem;
`;

const SearchButton = styled(Button)`
	${displayInfo({ message: "Search for user's posts", position: "bottom" })};
`;

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
					<SearchButton
						variant={isSmaller ? "menu" : undefined}
						size={isSmaller ? "large" : undefined}
					>
						<BiSearch />
						{!isSmaller && <span>Search</span>}
					</SearchButton>
				</Modal.Open>
				<Modal.Window name="searches">
					<Suspense fallback={<ThreeDots />}>
						<SearchesWindow
							onClickHandler={getUsersPosts}
							heading="Find user's posts"
						/>
					</Suspense>
				</Modal.Window>
			</Modal>
			<DashboardKeyRemove />
		</StyledFlexRow>
	);
};

export default DashboardKeyFilter;
