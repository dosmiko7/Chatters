import { BiChat } from "react-icons/bi";

import NoSelectedLayout from "../../ui/NoSelectedLayout";

const Chats = () => {
	return (
		<NoSelectedLayout
			message="No chat selected"
			icon={<BiChat />}
		/>
	);
};

export default Chats;
