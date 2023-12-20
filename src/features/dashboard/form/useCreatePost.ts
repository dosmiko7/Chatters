import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addDashboardPost } from "../../../services/firestore";
import { IDashboardFormInput } from "./DashboardForm";

// TODO: Change to dynamic user
const useCreatePost = () => {
	const queryClient = useQueryClient();
	//const { data } = useLoggedUser();

	const { mutate: createPost, status } = useMutation({
		mutationFn: (input: IDashboardFormInput) => addDashboardPost({ input, userId: "ivKwYDsLxLkM34cMKDdw" }),
		onSuccess: () => {
			toast.success("New post created");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error) => {
			toast.error("Something went wrong");
			console.error(error);
		},
	});

	return { createPost, status };
};

export default useCreatePost;
