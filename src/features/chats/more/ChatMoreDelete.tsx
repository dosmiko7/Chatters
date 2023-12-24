import { BiSolidTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";

import useDeleteChat from "./useDeleteChat";
import { toasterWarningOptions } from "../../../ui/ToasterWarning.options";
import Button from "../../../ui/Button";
import ToasterWarning from "../../../ui/ToasterWarning";

const MESSAGE = "Deleting a chat will delete all messages with that user.";

const ChatMoreDelete = () => {
	const { deleteChat } = useDeleteChat();

	const onClickHandler = () => {
		toast(
			(t) => (
				<ToasterWarning
					t={t}
					confirmHandler={() => deleteChat()}
					message={MESSAGE}
				/>
			),
			toasterWarningOptions({ id: "deleteChat" })
		);
	};

	return (
		<Button onClick={() => onClickHandler()}>
			<BiSolidTrash />
			Delete chat
		</Button>
	);
};

export default ChatMoreDelete;
