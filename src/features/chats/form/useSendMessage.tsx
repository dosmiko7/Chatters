import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import useLoggedUser from "../../../context/useLoggedUser";
import { TypeMessage, updateChatsMessages } from "../../../services/firestore/chatsApi";

const useSendMessage = () => {
	const { loggedUser } = useLoggedUser();
	const { combinedId } = useParams();
	const { mutateAsync: sendMessage, status } = useMutation({
		mutationFn: (input: FileList | string | TypeMessage) =>
			updateChatsMessages({ chatId: combinedId, senderId: loggedUser?.uid, input }),

		onError: (err) => {
			console.error("SEND MESSAGE ERROR ", err);
			toast.error("Sorry. Something went wrong.");
		},
	});

	return { sendMessage, status };
};

export default useSendMessage;
