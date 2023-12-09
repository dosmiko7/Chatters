import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

import { Container } from "../../../ui/Container";
import { flexCentered, flexColumn } from "../../../style/Templates";
import { Avatar } from "../../../ui/Avatar";
import Heading from "../../../ui/Heading";
import { Button } from "../../../ui/Button";
import ChatMoreOptions from "./ChatMoreOptions";

const StyledChatMoreInfo = styled(Container)`
	${flexColumn};
	position: relative;
	width: 25%;
`;

const CloseButton = styled(Button)`
	position: absolute;
	left: 1rem;
	top: 1rem;
`;

const Error = styled(Container)`
	${flexCentered};
`;

const Info = styled.div`
	${flexColumn}
	align-items: center;
	gap: 0.4rem;
`;

interface IChatMoreProps {
	data: { avatar: string; nickname: string; isActive: boolean; lastSeen: string };
	setEmoji: string;
	setTheme: string;
	handlerClose: () => void;
}

const ChatMore = ({ data, setEmoji, setTheme, handlerClose }: IChatMoreProps) => {
	if (!data) return <Error>Something went wrong 😓</Error>;

	const { avatar, nickname, isActive, lastSeen } = data;

	const activeStatus = isActive ? "🟢 Active now" : `🔴 Last seen ${lastSeen}`;

	return (
		<StyledChatMoreInfo>
			<CloseButton
				variant="menu"
				onClick={handlerClose}
			>
				<HiXMark style={{ fontSize: "2rem" }} />
			</CloseButton>
			<Info>
				<Avatar
					size="6rem"
					src={avatar}
				/>
				<Heading as="h3">{nickname}</Heading>
				<Heading as="h4">{activeStatus}</Heading>
			</Info>
			<ChatMoreOptions
				setEmoji={setEmoji}
				setTheme={setTheme}
			/>
		</StyledChatMoreInfo>
	);
};

export default ChatMore;
