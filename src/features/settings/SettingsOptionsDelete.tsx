import { FcDisapprove } from "react-icons/fc";
import { toast } from "react-hot-toast";

import useDeleteAccount from "../authentication/useDeleteAccount";
import { toasterWarningOptions } from "../../ui/ToasterWarning.options";
import Card from "../../ui/Card";
import ToasterWarning from "../../ui/ToasterWarning";

const INFO = "Delete your account permanently. All data will be cleared. It is not possible to recover your account.";

const MESSAGE = "Are you sure you want to delete your account?";

const SettingsOptionsDelete = () => {
	const { deleteUser } = useDeleteAccount();

	const onDeleteAccount = () => {
		toast(
			(t) => (
				<ToasterWarning
					t={t}
					confirmHandler={() => deleteUser()}
					message={MESSAGE}
				/>
			),
			toasterWarningOptions({ id: "resetPassword" })
		);
	};

	return (
		<Card
			icon={<FcDisapprove />}
			heading="Delete account"
			info={INFO}
			onClickHandler={onDeleteAccount}
		/>
	);
};

export default SettingsOptionsDelete;
