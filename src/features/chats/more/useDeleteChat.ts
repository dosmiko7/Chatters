import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { deleteChats } from "../../../services/firestore/chatsApi";

// TODO: Change for dynamic currentloggeduserId
const useDeleteChat = () => {
	const navigate = useNavigate();
	const { combinedId } = useParams();
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";

	const { mutateAsync: deleteChat, status } = useMutation({
		mutationFn: () => deleteChats({ userId: loggedUserId, chatId: combinedId }),

		onSuccess: () => {
			navigate("/chat");
			toast.success("Chat deletion was successful");
		},

		onError: (err) => {
			console.error("DELETING CHAT ERROR ", err);
			toast.error("Sorry. Something went wrong with chat removing.");
		},
	});

	return { deleteChat, status };
};

export default useDeleteChat;
