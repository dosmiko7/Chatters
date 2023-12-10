import { BiSolidTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";

import useDeleteChat from "./useDeleteChat";
import { Button } from "../../../ui/Button";
import ToasterWarning from "../../../ui/ToasterWarning";
import { toasterWarningOptions } from "../../../ui/ToasterWarning.options";

const message = "Deleting a chat will delete all messages with that user.";

const ChatMoreDelete = () => {
	const { deleteChat } = useDeleteChat();

	const onClickHandler = () => {
		toast(
			(t) => (
				<ToasterWarning
					t={t}
					confirmHandler={() => deleteChat()}
					message={message}
				/>
			),
			toasterWarningOptions
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
