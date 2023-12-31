import styled from "styled-components";

import { ephasis } from "../../style/Templates";
import Modal from "../../ui/Modal";
import Heading from "../../ui/Heading";
import AuthPasswordReminder from "./AuthPasswordReminder";

const Reminder = styled.a`
	display: block;
	width: fit-content;
	margin: 2rem auto;
	${ephasis};
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
