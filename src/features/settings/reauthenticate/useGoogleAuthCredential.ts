import { useQueryClient } from "@tanstack/react-query";

const useGoogleAuthCredential = () => {
	const queryClient = useQueryClient();
	const googleAuthCredential = queryClient.getQueryData(["googleAuthCredential"]);

	return googleAuthCredential;
};

export default useGoogleAuthCredential;
