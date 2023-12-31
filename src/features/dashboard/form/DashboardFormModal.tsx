import { BiSolidMessageAdd } from "react-icons/bi";
import styled from "styled-components";

import useSmallerResolution from "../../../hooks/useSmallerResolution";
import { displayInfo } from "../../../style/Templates";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import DashboardForm from "./DashboardForm";
import Heading from "../../../ui/Heading";

const AddButton = styled(Button)`
	${displayInfo({ message: "Add new post", position: "right" })}
`;

const DashboardFormModal = () => {
	const { isSmaller } = useSmallerResolution({ width: 860 });

	return (
		<Modal>
			<Modal.Open opens="dashboardForm">
				<AddButton
					variant={isSmaller ? "menu" : undefined}
					size={isSmaller ? "large" : undefined}
				>
					<BiSolidMessageAdd />
					{!isSmaller && <span>New post</span>}
				</AddButton>
			</Modal.Open>

			<Modal.Window name="dashboardForm">
				<Heading as="h2">Create post</Heading>
				<DashboardForm />
			</Modal.Window>
		</Modal>
	);
};

export default DashboardFormModal;
