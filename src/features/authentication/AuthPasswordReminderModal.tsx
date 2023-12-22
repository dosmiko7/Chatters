import styled from "styled-components";

import Modal from "../../ui/Modal";
import { ephasis } from "../../style/Templates";
import Heading from "../../ui/Heading";
import AuthPasswordReminder from "./AuthPasswordReminder";

const Reminder = styled.a`
	display: block;
	width: fit-content;
	margin: 5px auto;
	${ephasis}
`;

const AuthPasswordReminderModal = () => {
	return (
		<Modal>
			<Modal.Open opens="passwordReminder">
				<Reminder>Forgot Password</Reminder>
			</Modal.Open>
			<Modal.Window
				name="passwordReminder"
				width="max-content"
				height="max-content"
			>
				<Heading as="h2">Password reminder</Heading>
				<AuthPasswordReminder />
			</Modal.Window>
		</Modal>
	);
};

export default AuthPasswordReminderModal;