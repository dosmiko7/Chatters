import { BiChat } from "react-icons/bi";

import Empty from "../../ui/Empty";

const Chats = () => {
	return (
		<Empty
			message="No chat selected"
			icon={<BiChat />}
		/>
	);
};

export default Chats;
