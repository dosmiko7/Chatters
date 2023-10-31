import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signIn, ISignProps } from "../../services/auth";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, status } = useMutation({
		mutationFn: ({ email, password }: ISignProps) => signIn({ email, password }),

		onSuccess: (user: User) => {
			queryClient.setQueryData(["user"], user);
			navigate("/dashboard", { replace: true });
		},

		onError: (err) => {
			console.error("LOGIN ERROR ", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, status };
};
