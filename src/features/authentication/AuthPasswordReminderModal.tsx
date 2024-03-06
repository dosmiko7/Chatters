import { lazy } from "react";
import styled from "styled-components";

import { ephasis } from "../../style/Templates";
import Modal from "../../ui/Modal";
import Heading from "../../ui/Heading";
import withLoader from "../../hocs/withLoader";
const AuthPasswordReminder = lazy(() => import("./AuthPasswordReminder"));

const Reminder = styled.a`
	display: block;
	width: fit-content;
	margin: 2rem auto;
	${ephasis};
`;

const AuthPasswordReminderWithLoader = withLoader({
	componentToSuspense: AuthPasswordReminder,
});

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
				<AuthPasswordReminderWithLoader />
			</Modal.Window>
		</Modal>
	);
};

export default AuthPasswordReminderModal;
