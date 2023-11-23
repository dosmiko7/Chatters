import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

import { IUserData } from "../../services/firestore";
import formatDate from "../../utils/formatDate";
import { Container } from "../../ui/Container";
import { flexCentered, flexColumn } from "../../style/Templates";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import { Button } from "../../ui/Button";

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
	data: IUserData | undefined;
	handlerClose: () => void;
}

const ChatMore = ({ data, handlerClose }: IChatMoreProps) => {
	if (!data) return <Error>Something went wrong 😓</Error>;

	const activeStatus =
		data.lastLoggedIn > data.lastLoggedOut ? "🟢 Active now" : `🔴 Last seen ${formatDate(data.lastLoggedOut)}`;

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
					src={data.avatar}
				/>
				<Heading as="h3">{data.nickname}</Heading>
				<Heading as="h4">{activeStatus}</Heading>
			</Info>
		</StyledChatMoreInfo>
	);
};

export default ChatMore;
