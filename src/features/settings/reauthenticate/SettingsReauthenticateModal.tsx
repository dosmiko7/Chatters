import { FcDisapprove } from "react-icons/fc";

import useLoggedUser from "../../authentication/useLoggedUser";
import SettingsReauthenticate from "./SettingsReauthenticate";
import Wrapper from "../../../ui/Wrapper";
import Paragraph from "../../../ui/Paragraph";
import Modal from "../../../ui/Modal";
import Card from "../../../ui/Card";

const INFO = "Delete your account permanently. All data will be cleared. It is not possible to recover your account.";

// INFO: DELETE OPTION IS DISABLED FOR TEST ACCOUNT
const SettingsReauthenticateModal = () => {
	const { loggedUser } = useLoggedUser();

	const info = <Paragraph>Delete option is disabled for test user</Paragraph>;

	return (
		<Modal>
			<Modal.Open opens="reauthenticate">
				<Wrapper>
					<Card
						icon={<FcDisapprove />}
						heading="Delete account"
						info={INFO}
					/>
				</Wrapper>
			</Modal.Open>

			<Modal.Window
				name="reauthenticate"
				height="fit-content"
			>
				{loggedUser?.email === "cidot77582@vkr1.com" ? info : <SettingsReauthenticate />}
			</Modal.Window>
		</Modal>
	);
};

export default SettingsReauthenticateModal;
