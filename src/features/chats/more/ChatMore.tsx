import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

import { breakpoints } from "../../../style/GlobalStyles";
import { flexCentered, flexColumn } from "../../../style/Templates";
import Container from "../../../ui/Container";
import Button from "../../../ui/Button";
import ChatMoreInfo from "./ChatMoreInfo";
import ChatMoreOptions from "./ChatMoreOptions";
import ErrorMessage from "../../../ui/ErrorMessage";

const StyledChatMoreInfo = styled(Container)`
	${flexColumn};
	position: relative;
	width: 25%;

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		position: absolute;
		width: 100%;
		height: 100%;
	}
`;

const CloseButton = styled(Button)`
	position: absolute;
	left: 1rem;
	top: 1rem;
`;

const Error = styled(ErrorMessage)`
	${flexCentered};
`;

interface IChatMoreProps {
	data?: { avatar: string; nickname: string; isActive: boolean; lastSeen: string };
	setEmoji: string;
	setTheme: string;
	handlerClose: () => void;
}

const ChatMore = ({ data, setEmoji, setTheme, handlerClose }: IChatMoreProps) => {
	if (!data) return <Error>Something went wrong 😓</Error>;

	const customizationData = { setEmoji, setTheme };

	return (
		<StyledChatMoreInfo as="aside">
			<CloseButton
				variant="menu"
				onClick={handlerClose}
			>
				<HiXMark style={{ fontSize: "2rem" }} />
			</CloseButton>
			<ChatMoreInfo infoData={data} />
			<ChatMoreOptions customizationData={customizationData} />
		</StyledChatMoreInfo>
	);
};

export default ChatMore;
