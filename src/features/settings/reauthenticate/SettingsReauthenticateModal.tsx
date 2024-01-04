import { FcDisapprove } from "react-icons/fc";

import SettingsReauthenticate from "./SettingsReauthenticate";
import Modal from "../../../ui/Modal";
import Card from "../../../ui/Card";

const INFO = "Delete your account permanently. All data will be cleared. It is not possible to recover your account.";

// INFO: DELETE OPTION IS DISABLED FOR TEST ACCOUNT
import useLoggedUser from "../../authentication/useLoggedUser";

const SettingsReauthenticateModal = () => {
	const { loggedUser } = useLoggedUser();

	const info = <div>Delete option is disabled for test user</div>;

	return (
		<Modal>
			<Modal.Open opens="reauthenticate">
				<div>
					<Card
						icon={<FcDisapprove />}
						heading="Delete account"
						info={INFO}
					/>
				</div>
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
