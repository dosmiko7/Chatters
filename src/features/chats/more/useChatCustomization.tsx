import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateChatsCustomization } from "../../../services/firestore";

const useChatCustomization = () => {
	const { combinedId } = useParams();
	const { mutateAsync: changeCustomization, status } = useMutation({
		mutationFn: ({ emoji, theme }: { emoji?: string; theme?: string }) =>
			updateChatsCustomization({ chatId: combinedId, emoji, theme }),

		onError: (err) => {
			console.error("CUSTOMIZATION ERROR ", err);
			toast.error("Sorry. Something went wrong with customization.");
		},
	});

	return { changeCustomization, status };
};

export default useChatCustomization;
