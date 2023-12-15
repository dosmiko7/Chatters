import { BiSolidMessageAdd } from "react-icons/bi";

import { Button } from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import DashboardForm from "./DashboardForm";

const DashboardFormModal = () => {
	return (
		<Modal>
			<Modal.Open opens="dashboardForm">
				<Button>
					<BiSolidMessageAdd />
					<span>New post</span>
				</Button>
			</Modal.Open>

			<Modal.Window name="dashboardForm">
				<DashboardForm />
			</Modal.Window>
		</Modal>
	);
};

export default DashboardFormModal;
