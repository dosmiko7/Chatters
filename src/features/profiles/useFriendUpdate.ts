import { useMutation } from "@tanstack/react-query";
import { friendUpdate } from "../../services/firestore";
import { toast } from "react-hot-toast";

interface IUseFriendUpdateProps {
	userId: string;
	friendId: string;
	mode: "remove" | "add";
}

const useFriendUpdate = () => {
	const { mutate: updateFriend, status } = useMutation({
		mutationFn: ({ userId, friendId, mode }: IUseFriendUpdateProps) => friendUpdate({ userId, friendId, mode }),

		onError: (err) => {
			toast.error("Sorry. Something went wrong.");
			console.error("FRIEND UPDATE ERROR ", err);
		},
	});

	return { updateFriend, status };
};

export default useFriendUpdate;
