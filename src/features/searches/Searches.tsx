import { BiSearch } from "react-icons/bi";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import SearchesWindow from "./SearchesWindow";

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
				<SearchesWindow
					onClickHandler={onClickHandler}
					heading="Find user's profile"
				/>
			</Modal.Window>
		</Modal>
	);
};

export default Searches;
