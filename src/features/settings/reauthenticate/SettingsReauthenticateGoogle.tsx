import useGoogleAuthCredential from "./useGoogleAuthCredential";
import Button from "../../../ui/Button";

const SettingsReauthenticateGoogle = () => {
	const googleAuthCredential = useGoogleAuthCredential();

	if (!googleAuthCredential) return null;

	return <Button variant="danger">Delete account</Button>;
};

export default SettingsReauthenticateGoogle;
