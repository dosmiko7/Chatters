import Options from "../../../../../ui/Options";
import ChatMoreDelete from "./ChatMoreDelete";

const ChatMorePrivacy = () => {
	return (
		<Options.Container>
			<Options.Category>Privacy</Options.Category>
			<Options.List>
				<Options.Option key="delete">
					<ChatMoreDelete />
				</Options.Option>
			</Options.List>
		</Options.Container>
	);
};

export default ChatMorePrivacy;
