import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ISignProps, signIn } from "../../services/auth/authApi";

const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, status } = useMutation({
		mutationFn: ({ email, password }: ISignProps) => signIn({ email, password }),

		onSuccess: ({ userCredential, authCredential }) => {
			queryClient.setQueryData(["loggedUser"], userCredential.user);
			queryClient.setQueryData(["emailAuthCredential"], authCredential);
			localStorage.setItem("loggedUser", JSON.stringify(userCredential.user));
			navigate("/dashboard", { replace: true });
		},

		onError: (err) => {
			console.error("LOGIN ERROR ", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, status };
};

export default useLogin;
