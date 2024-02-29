import { Suspense, lazy } from "react";
import { BiSearch } from "react-icons/bi";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ThreeDots from "../../ui/ThreeDots";
const SearchesWindow = lazy(() => import("./SearchesWindow"));

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
				<Suspense fallback={<ThreeDots />}>
					<SearchesWindow
						onClickHandler={onClickHandler}
						heading="Find user's profile"
					/>
				</Suspense>
			</Modal.Window>
		</Modal>
	);
};

export default Searches;
