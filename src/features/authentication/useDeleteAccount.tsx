import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useLoggedUser from "./useLoggedUser";
import { deleteAccount } from "../../services/auth";

const useDeleteAccount = () => {
	const { data } = useLoggedUser();
	const navigate = useNavigate();

	const { mutate: deleteUser, status } = useMutation({
		mutationFn: () => deleteAccount({ user: data }),

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
