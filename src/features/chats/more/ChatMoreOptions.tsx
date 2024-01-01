import styled from "styled-components";

import { flexColumn } from "../../../style/Templates";
import ChatMoreCustomization, { ICustomizationProps } from "./ChatMoreCustomization";
import ChatMorePrivacy from "./ChatMorePrivacy";

const StyledChatMoreOptions = styled.div`
	${flexColumn};

	@media only screen and (width <= 1000px) {
		font-size: 1.8rem;
		h3 {
			font-size: 2rem;
		}
	}
`;

const ChatMoreOptions = ({ customizationData }: { customizationData: ICustomizationProps }) => {
	return (
		<StyledChatMoreOptions>
			<ChatMoreCustomization data={customizationData} />
			<ChatMorePrivacy />
		</StyledChatMoreOptions>
	);
};

export default ChatMoreOptions;
