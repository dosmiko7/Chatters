import { useQueryClient } from "@tanstack/react-query";

const useEmailAuthCredential = () => {
	const queryClient = useQueryClient();
	const emailAuthCredential = queryClient.getQueryData(["emailAuthCredential"]);

	return emailAuthCredential;
};

export default useEmailAuthCredential;
