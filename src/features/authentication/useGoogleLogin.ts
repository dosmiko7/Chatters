import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

import { signInWithGoogle } from "../../services/auth/authApi";
import { addUser } from "../../services/firestore/userApi";

const useGoogleLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, status } = useMutation({
		mutationFn: () => signInWithGoogle().then((user: User) => addUser(user)),

		onSuccess: (user: User) => {
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
