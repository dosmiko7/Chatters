import { useQueryClient } from "@tanstack/react-query";
import { OAuthCredential } from "firebase/auth";

const useGoogleAuthCredential = () => {
	const queryClient = useQueryClient();
	const googleAuthCredential: OAuthCredential | undefined = queryClient.getQueryData(["googleAuthCredential"]);

	return googleAuthCredential;
};

export default useGoogleAuthCredential;
