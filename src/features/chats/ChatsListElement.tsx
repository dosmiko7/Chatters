import styled from "styled-components";

import { ListElement } from "../../ui/ListElement";
import { Wrapper } from "../../ui/Wrapper";
import { flexColumn } from "../../style/Templates";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";

interface IStatus {
	isActive: boolean;
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
		background-color: ${(props) => (props.isActive ? "var(--color-green-100)" : "transparent")};
	}
`;

const Box = styled(Wrapper)`
	${flexColumn};
	width: 70%;
	flex: 1 1;
	white-space: nowrap;
	padding-left: var(--padding-sm);
`;

const Message = styled.p`
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

interface IPrivChatEl {
	onClickHandler: () => void;
	isActive: boolean;
	avatar: string;
	nickname: string;
	lastMessage: string;
}

// TODO: Displaying last message. If it is not readen - color: white
const ChatsListElement = (props: IPrivChatEl) => {
	const { onClickHandler, avatar, lastMessage, nickname, isActive } = props;

	return (
		<StyledListElement
			onClick={onClickHandler}
			isActive={isActive}
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

export default ChatsListElement;
