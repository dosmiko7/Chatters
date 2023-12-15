import { BiSolidMessageAdd } from "react-icons/bi";

import { Button } from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import DashboardForm from "./DashboardForm";
import Heading from "../../../ui/Heading";

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
				<Heading as="h2">New post</Heading>
				<DashboardForm />
			</Modal.Window>
		</Modal>
	);
};

export default DashboardFormModal;
