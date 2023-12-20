import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { removeDashboardPost } from "../../services/firestore";

const useDeletePost = () => {
	const queryClient = useQueryClient();

	const { mutate: deletePost, status } = useMutation({
		mutationFn: (postId: string) => removeDashboardPost(postId),

		onSuccess: () => {
			toast.success("The post has been successfully deleted");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},

		onError: (error) => {
			toast.error("Post deletion failed");
			console.error(error);
		},
	});

	return { deletePost, status };
};

export default useDeletePost;
