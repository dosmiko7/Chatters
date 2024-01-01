import Options from "../../../ui/Options";
import ChatMoreModalEmoji from "./ChatMoreModalEmoji";
import ChatMoreModalTheme from "./ChatMoreModalTheme";

export interface ICustomizationProps {
	setTheme: string;
	setEmoji: string;
}

const ChatMoreCustomization = ({ data }: { data: ICustomizationProps }) => {
	const { setTheme, setEmoji } = data;

	return (
		<Options.Container>
			<Options.Category>Customization</Options.Category>
			<Options.List>
				<Options.Option key={setEmoji}>
					<ChatMoreModalEmoji setEmoji={setEmoji} />
				</Options.Option>
				<Options.Option key={setTheme}>
					<ChatMoreModalTheme setTheme={setTheme} />
				</Options.Option>
			</Options.List>
		</Options.Container>
	);
};

export default ChatMoreCustomization;
