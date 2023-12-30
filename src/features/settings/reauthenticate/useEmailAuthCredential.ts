import { useQueryClient } from "@tanstack/react-query";
import { EmailAuthCredential } from "firebase/auth";

const useEmailAuthCredential = () => {
	const queryClient = useQueryClient();
	const emailAuthCredential: EmailAuthCredential | undefined = queryClient.getQueryData(["emailAuthCredential"]);

	return emailAuthCredential;
};

export default useEmailAuthCredential;
