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

		onSuccess: async ({ authCredential, userCredential, isNewUser }) => {
			if (isNewUser) await addUser(userCredential.user);

			queryClient.setQueryData(["loggedUser"], userCredential.user);
			localStorage.setItem("loggedUser", JSON.stringify(userCredential.user));
			queryClient.setQueryData(["googleAuthCredential"], authCredential);
			navigate("/dashboard", { replace: true });
		},

		onError: (err) => {
			console.error("GOOGLE LOGIN ERROR ", err);
			toast.error("Google login failed");
		},
	});

	return { login, status };
};

export default useGoogleLogin;
