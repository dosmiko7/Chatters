import { FcDisapprove } from "react-icons/fc";

import SettingsReauthenticate from "./SettingsReauthenticate";
import Modal from "../../../ui/Modal";
import Card from "../../../ui/Card";

const INFO = "Delete your account permanently. All data will be cleared. It is not possible to recover your account.";

const SettingsReauthenticateModal = () => {
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
				<SettingsReauthenticate />
			</Modal.Window>
		</Modal>
	);
};

export default SettingsReauthenticateModal;
