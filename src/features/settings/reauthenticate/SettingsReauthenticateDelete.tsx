import useEmailAuthCredential from "./useEmailAuthCredential";
import useGoogleAuthCredential from "./useGoogleAuthCredential";
import useDeleteAccount from "../../authentication/useDeleteAccount";
import Button from "../../../ui/Button";
import ErrorMessage from "../../../ui/ErrorMessage";
import ThreeDots from "../../../ui/ThreeDots";

const SettingsReauthenticateDelete = () => {
	const emailAuthCredential = useEmailAuthCredential();
	const googleAuthCredential = useGoogleAuthCredential();
	const { deleteAccount, status } = useDeleteAccount();

	if (!emailAuthCredential && !googleAuthCredential) return <ErrorMessage>Please log in again.</ErrorMessage>;

	if (status === "pending") return <ThreeDots />;

	return (
		<Button
			variant="danger"
			onClick={() => deleteAccount()}
		>
			Delete account
		</Button>
	);
};

export default SettingsReauthenticateDelete;
