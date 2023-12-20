import { useContext } from "react";
import { BiSearch } from "react-icons/bi";

import Modal from "../../ui/Modal";
import { Button } from "../../ui/Button";
import SearchesWindow from "../searches/SearchesWindow";
import { DashboardOptionsContext } from "../../context/DashboardOptions";

const DashboardKeyFilter = () => {
	const { setKey } = useContext(DashboardOptionsContext);

	const getUsersPosts = (userId: string) => {
		setKey(userId);
	};

	return (
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
	);
};

export default DashboardKeyFilter;
