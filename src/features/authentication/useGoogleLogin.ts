import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signInWithGoogle } from "../../services/auth/authApi";
import { addUser } from "../../services/firestore/userApi";

const useGoogleLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, status } = useMutation({
		mutationFn: () => signInWithGoogle(),

		onSuccess: ({ user, isNewUser }) => {
			if (isNewUser) addUser(user);

			queryClient.setQueryData(["loggedUser"], user);
			navigate("/dashboard", { replace: true });
		},

		onError: (err) => {
			console.error("GOOGLE LOGIN ERROR ", err);
			toast.error(err.message);
		},
	});

	return { login, status };
};

export default useGoogleLogin;
