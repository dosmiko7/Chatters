import ChatMoreCustomization, { ICustomizationProps } from "./ChatMoreCustomization";

const ChatMoreOptions = ({ customizationData }: { customizationData: ICustomizationProps }) => {
	return <ChatMoreCustomization data={customizationData} />;
};

export default ChatMoreOptions;
