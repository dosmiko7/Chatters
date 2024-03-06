import { lazy } from "react";
import { BiSearch } from "react-icons/bi";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import withLoader from "../../hocs/withLoader";
const SearchesWindow = lazy(() => import("./SearchesWindow"));

const SearchesWindowWithLoader = withLoader({
	componentToSuspense: SearchesWindow,
});

const Searches = ({ onClickHandler }: { onClickHandler: (userId: string) => void }) => {
	return (
		<Modal>
			<Modal.Open opens="searches">
				<Button
					variant="menu"
					size="large"
				>
					<BiSearch />
				</Button>
			</Modal.Open>
			<Modal.Window name="searches">
				<SearchesWindowWithLoader
					onClickHandler={onClickHandler}
					heading="Find user's profile"
				/>
			</Modal.Window>
		</Modal>
	);
};

export default Searches;
