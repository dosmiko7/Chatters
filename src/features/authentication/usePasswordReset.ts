import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { sendPasswordReset } from "../../services/auth/authApi";

const usePasswordReset = () => {
	const { mutate: sendResetEmail, status } = useMutation({
		mutationFn: ({ email }: { email: string }) => sendPasswordReset({ email }),

		onSuccess: () => {
			toast.success("We have sent a message. Check your email");
		},

		onError: (error) => {
			console.error(error);
			toast.error("Something went wrong. Try again later.");
		},
	});

	return { sendResetEmail, status };
};

export default usePasswordReset;
