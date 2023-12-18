import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addDashboardPost } from "../../../services/firestore";
import { IDashboardFormInput } from "./DashboardForm";

// TODO: Change to dynamic user
const useCreatePost = () => {
	//const { data } = useLoggedUser();

	const { mutate: createPost, status } = useMutation({
		mutationFn: (input: IDashboardFormInput) => addDashboardPost({ input, userId: "ivKwYDsLxLkM34cMKDdw" }),
		onSuccess: () => {
			toast.success("New post created");
		},
		onError: (error) => {
			toast.error("Something went wrong");
			console.error(error);
		},
	});

	return { createPost, status };
};

export default useCreatePost;
