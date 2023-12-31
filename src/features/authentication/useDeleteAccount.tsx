import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useLoggedUser from "./useLoggedUser";
import useEmailAuthCredential from "../settings/reauthenticate/useEmailAuthCredential";
import useGoogleAuthCredential from "../settings/reauthenticate/useGoogleAuthCredential";
import { deleteUser } from "../../services/firestore/userApi";
import { reauthenticateAccount } from "../../services/auth/authApi";

const useDeleteAccount = () => {
	const { loggedUser } = useLoggedUser();
	const emailAuthCredential = useEmailAuthCredential();
	const googleAuthCredential = useGoogleAuthCredential();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: deleteAccount, status } = useMutation({
		mutationFn: () =>
			reauthenticateAccount({ user: loggedUser, credential: emailAuthCredential || googleAuthCredential }).then(() =>
				deleteUser({ user: loggedUser })
			),

		onSuccess: () => {
			toast.success("We have deleted your account successfully");
			queryClient.removeQueries();
			localStorage.removeItem("userData");
			navigate("/login");
		},

		onError: (error) => {
			console.error(error);
			toast.error("Account deletion failed");
		},
	});

	return { deleteAccount, status };
};

export default useDeleteAccount;
