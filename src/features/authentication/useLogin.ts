import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ISignProps, signIn } from "../../services/auth/authApi";
import { updateUserTimestamp } from "../../services/firestore/userApi";

const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, status } = useMutation({
		mutationFn: ({ email, password }: ISignProps) => signIn({ email, password }),

		onSuccess: (user: User | null) => {
			queryClient.setQueryData(["loggedUser"], user);
			updateUserTimestamp({ mode: "login", userId: user?.uid });
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
