import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useLoggedUser from "../../context/useLoggedUser";
import { deleteAccount } from "../../services/auth/authApi";

const useDeleteAccount = () => {
	const { loggedUser } = useLoggedUser();
	const navigate = useNavigate();

	const { mutate: deleteUser, status } = useMutation({
		mutationFn: () => deleteAccount({ user: loggedUser }),

		onSuccess: () => {
			toast.success("We have deleted your account successfully");
			navigate("/login");
		},

		onError: (error) => {
			console.error(error);
			toast.error("Account deletion failed");
		},
	});

	return { deleteUser, status };
};

export default useDeleteAccount;
