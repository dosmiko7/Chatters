import ChatMoreCustomization, { ICustomizationProps } from "./ChatMoreCustomization";
import ChatMorePrivacy from "./ChatMorePrivacy";

const ChatMoreOptions = ({ customizationData }: { customizationData: ICustomizationProps }) => {
	return (
		<>
			<ChatMoreCustomization data={customizationData} />
			<ChatMorePrivacy />
		</>
	);
};

export default ChatMoreOptions;
