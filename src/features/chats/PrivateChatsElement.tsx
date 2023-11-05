import styled, { css } from "styled-components";

import { ListElement } from "../../ui/ListElement";
import { Wrapper } from "../../ui/Wrapper";
import { flexColumn } from "../../style/Templates";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";

const StyledListElement = styled(ListElement)`
	&:hover {
		background-color: var(--color-primary-300);
	}
`;

interface IAvatar {
	status: string;
}

const StyledAvatar = styled(Avatar)<IAvatar>`
	border: 1px solid transparent;
	${(props) =>
		props.status === "read" &&
		css`
			border: 1px solid var(--color-secondary-100);
		`}

	${(props) =>
		props.status === "unread" &&
		css`
			border: 1px solid var(--color-secondary-100);
		`}
`;

interface IBox {
	newMessege: boolean;
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

export interface IPrivChatEl {
	onClickHandler: () => void;
	nickname: string;
	avatar?: string;
	status: string;
	lastMessege: string;
	newMessege: boolean;
}

// TODO: Displaying last message. If it is not readen - color: white
const PrivateChatsElement = (props: IPrivChatEl) => {
	const { onClickHandler, nickname, avatar, status, lastMessege = "", newMessege } = props;
	return (
		<StyledListElement onClick={onClickHandler}>
			<StyledAvatar
				src={avatar}
				status={status}
				width="4rem"
			/>
			<Box newMessege={newMessege}>
				<Heading as="h4">{nickname}</Heading>
				<Message>{lastMessege}</Message>
			</Box>
		</StyledListElement>
	);
};

export default PrivateChatsElement;
