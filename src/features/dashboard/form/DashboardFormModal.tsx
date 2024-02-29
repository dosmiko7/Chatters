import { Suspense, lazy } from "react";
import { BiSolidMessageAdd } from "react-icons/bi";
import styled from "styled-components";

import useSmallerResolution from "../../../hooks/useSmallerResolution";
import { displayInfo } from "../../../style/Templates";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import Heading from "../../../ui/Heading";
import ThreeDots from "../../../ui/ThreeDots";
const DashboardForm = lazy(() => import("./DashboardForm"));

const AddButton = styled(Button)`
	${displayInfo({ message: "Add new post", position: "right" })}
`;

const DashboardFormModal = () => {
	const { isSmaller } = useSmallerResolution({ width: 860 });

	return (
		<Modal>
			<Modal.Open opens="dashboardForm">
				{isSmaller ? (
					<AddButton
						variant="menu"
						size="large"
					>
						<BiSolidMessageAdd />
					</AddButton>
				) : (
					<AddButton>
						<BiSolidMessageAdd />
						<span>New post</span>
					</AddButton>
				)}
			</Modal.Open>

			<Modal.Window name="dashboardForm">
				<Suspense fallback={<ThreeDots />}>
					<Heading as="h2">Create post</Heading>
					<DashboardForm />
				</Suspense>
			</Modal.Window>
		</Modal>
	);
};

export default DashboardFormModal;
