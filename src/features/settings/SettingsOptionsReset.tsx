import { FcLock } from "react-icons/fc";
import { toast } from "react-hot-toast";

import usePasswordReset from "../authentication/usePasswordReset";
//import useLoggedUser from "../authentication/useLoggedUser";
import Card from "../../ui/Card";

const INFO =
	"Click if you want to change your password. We will send you a message to your email with the option to reset your password.";

//TODO: Remove static email
const SettingsOptionsReset = () => {
	//const { data } = useLoggedUser();
	const data = { email: "miko7pl@gmail.com" };
	const { sendResetEmail } = usePasswordReset();

	const onPasswordReset = () => {
		if (data?.email) {
			sendResetEmail({ email: data.email });
		} else {
			toast.error("There is no email address we can send a message to");
		}
	};

	return (
		<Card
			icon={<FcLock />}
			heading="Password reset"
			info={INFO}
			onClickHandler={onPasswordReset}
		/>
	);
};

export default SettingsOptionsReset;
