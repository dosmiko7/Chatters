import styled from "styled-components";

import { breakpoints } from "../../../../style/GlobalStyles";
import { flexColumn } from "../../../../style/Templates";
import ChatMoreCustomization, { ICustomizationProps } from "./customization/ChatMoreCustomization";
import ChatMorePrivacy from "./privacy/ChatMorePrivacy";

const StyledChatMoreOptions = styled.div`
	${flexColumn};

	@media only screen and (width <= ${breakpoints.tabletScreen}) {
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
