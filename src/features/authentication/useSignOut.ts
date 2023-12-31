import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signOutUser } from "../../services/auth/authApi";

const useSignOut = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: signOut, status } = useMutation({
		mutationFn: () => signOutUser(),

		onSuccess: () => {
			toast.success("You have logged out successfully");
			queryClient.removeQueries();
			localStorage.removeItem("loggedUser");
			navigate("/login", { replace: true });
		},

		onError: () => {
			toast.error("Logout failed");
		},
	});

	return { signOut, status };
};

export default useSignOut;
