import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import useLoggedUser from "../../authentication/useLoggedUser";
import { addDashboardPost } from "../../../services/firestore/dashboardApi";
import { IDashboardFormInput } from "./DashboardForm";

const useCreatePost = () => {
	const queryClient = useQueryClient();
	const { loggedUser } = useLoggedUser();

	const { mutate: createPost, status } = useMutation({
		mutationFn: (input: IDashboardFormInput) => addDashboardPost({ input, userId: loggedUser?.uid }),
		onSuccess: () => {
			toast.success("New post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error) => {
			toast.error("Adding a post failed");
			console.error(error);
		},
	});

	return { createPost, status };
};

export default useCreatePost;
