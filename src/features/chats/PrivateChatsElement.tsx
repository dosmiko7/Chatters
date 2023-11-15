import styled, { css } from "styled-components";

import { ListElement } from "../../ui/ListElement";
import { Wrapper } from "../../ui/Wrapper";
import { flexColumn } from "../../style/Templates";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import { IFormattedFriend } from "../../utils/formatFriendsList";

const StyledListElement = styled(ListElement)`
	&:hover {
		background-color: var(--color-primary-300);
	}
`;

interface IAvatar {
	status?: string;
}

const StyledAvatar = styled(Avatar)<IAvatar>`
	border: 1px solid transparent;
	${(props) =>
		props.status === "active" &&
		css`
			border: 1px solid var(--color-green-100);
		`}
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
		<StyledListElement onClick={onClickHandler}>
			<StyledAvatar
				src={avatar}
				width="4rem"
				status={status}
			/>
			<Box>
				<Heading as="h4">{nickname}</Heading>
				<Message>{lastMessage}</Message>
			</Box>
		</StyledListElement>
	);
};

export default PrivateChatsElement;
