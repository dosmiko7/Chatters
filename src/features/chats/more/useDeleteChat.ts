import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import useLoggedUser from "../../../context/useLoggedUser";
import { deleteChats } from "../../../services/firestore/chatsApi";

const useDeleteChat = () => {
	const navigate = useNavigate();
	const { combinedId } = useParams();
	const { loggedUser } = useLoggedUser();

	const { mutateAsync: deleteChat, status } = useMutation({
		mutationFn: () => deleteChats({ userId: loggedUser?.uid, chatId: combinedId }),

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
