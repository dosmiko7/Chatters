import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { updateChats } from "../../../services/firestore";

// TODO: Change for dynamic loggedUserId
const useSendMessage = () => {
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	const { combinedId } = useParams();
	const { mutate: sendMessage, status } = useMutation({
		mutationFn: (input: string) => updateChats({ chatId: combinedId, senderId: loggedUserId, message: input }),

		onError: (err) => {
			console.error("SEND MESSAGE ERROR ", err);
			toast.error("Sorry. Something went wrong.");
		},
	});

	return { sendMessage, status };
};

export default useSendMessage;
