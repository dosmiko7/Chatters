import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

import { signOutUser } from "../../services/auth/authApi";
import { updateUserTimestamp } from "../../services/firestore/userApi";

const useSignOut = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: signOut, status } = useMutation({
		mutationFn: () => signOutUser(),

		onSuccess: (user: User | null) => {
			toast.success("You have logged out successfully");
			queryClient.removeQueries();
			updateUserTimestamp({ mode: "logout", userId: user?.uid });
			navigate("/login", { replace: true });
		},

		onError: () => {
			toast.error("Logout failed");
		},
	});

	return { signOut, status };
};

export default useSignOut;
