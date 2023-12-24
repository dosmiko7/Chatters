import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addDashboardPost } from "../../../services/firestore/dashboardApi";
import { IDashboardFormInput } from "./DashboardForm";

// TODO: Change to dynamic user
const useCreatePost = () => {
	const queryClient = useQueryClient();
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	//const { data } = useLoggedUser();

	const { mutate: createPost, status } = useMutation({
		mutationFn: (input: IDashboardFormInput) => addDashboardPost({ input, userId: loggedUserId }),
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
