import useEmailAuthCredential from "./useEmailAuthCredential";
import Button from "../../../ui/Button";

const SettingsReauthenticateEmail = () => {
	const emailAuthCredential = useEmailAuthCredential();

	if (!emailAuthCredential) return null;

	return <Button variant="danger">Delete account</Button>;
};

export default SettingsReauthenticateEmail;
