import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { friendUpdate } from "../../../services/firestore/userApi";

interface IUseFriendUpdateProps {
	userId: string;
	profileId: string | undefined;
}

const useFriendUpdate = ({ userId, profileId }: IUseFriendUpdateProps) => {
	const queryClient = useQueryClient();

	const { mutate: updateFriend, status } = useMutation({
		mutationFn: (mode: "add" | "remove") => friendUpdate({ userId, friendId: profileId, mode }),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile", profileId] });
		},

		onError: (err) => {
			toast.error("Sorry. Something went wrong.");
			console.error("FRIEND UPDATE ERROR ", err);
		},
	});

	return { updateFriend, status };
};

export default useFriendUpdate;
