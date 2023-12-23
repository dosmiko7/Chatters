import { FcLock } from "react-icons/fc";

import Card from "../../ui/Card";

const INFO =
	"Click if you want to change your password. We will send you a message to your email with the option to reset your password.";

const SettingsOptionsReset = () => {
	const onPasswordReset = () => {
		console.log("eheh");
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
