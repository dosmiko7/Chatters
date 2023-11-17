import styled, { css } from "styled-components";

import { ListElement } from "../../ui/ListElement";
import { Wrapper } from "../../ui/Wrapper";
import { flexColumn } from "../../style/Templates";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import { IFormattedFriend } from "../../utils/formatFriendsList";

interface IStatus {
	status: "active" | "nonActive";
}

const StyledListElement = styled(ListElement)<IStatus>`
	position: relative;

	&:hover {
		background-color: var(--color-primary-300);
	}

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 80%;
		background-color: ${(props) => (props.status === "active" ? "var(--color-green-100)" : "transparent")};
	}
`;
interface IBox {
	newMessege?: boolean;
}

const Box = styled(Wrapper)<IBox>`
	${flexColumn};
	width: 70%;
	flex: 1 1;
	white-space: nowrap;
	padding-left: var(--padding-sm);

	${(props) =>
		props.newMessege &&
		css`
			color: var(--color-primary-0);
		`}

	${(props) =>
		!props.newMessege &&
		css`
			color: inherit;
		`}
`;

const Message = styled.p`
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

interface IPrivChatEl extends IFormattedFriend {
	onClickHandler: () => void;
}

// TODO: Displaying last message. If it is not readen - color: white
const PrivateChatsElement = (props: IPrivChatEl) => {
	const { onClickHandler, nickname, avatar, lastMessage, status } = props;

	return (
		<StyledListElement
			onClick={onClickHandler}
			status={status}
		>
			<Avatar
				src={avatar}
				size="4rem"
			/>
			<Box>
				<Heading as="h4">{nickname}</Heading>
				<Message>{lastMessage}</Message>
			</Box>
		</StyledListElement>
	);
};

export default PrivateChatsElement;
