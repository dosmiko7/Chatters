import styled from "styled-components";

import { breakpoints } from "../../../style/GlobalStyles";
import { flexCentered, flexColumn } from "../../../style/Templates";
import ListElement from "../../../ui/ListElement";
import Avatar from "../../../ui/Avatar";
import Heading from "../../../ui/Heading";
import useSmallerResolution from "../../../hooks/useSmallerResolution";

interface IStatus {
	isActive: boolean;
}

const StyledListElement = styled(ListElement)<IStatus>`
	position: relative;

	&:hover {
		background-color: var(--color-primary-200);
		cursor: pointer;
	}

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 80%;
		background-color: ${(props) => (props.isActive ? "var(--color-green-200)" : "transparent")};
	}

	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		${flexCentered};
	}
`;

const Box = styled.div`
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

const ChatsListElement = (props: IPrivChatEl) => {
	const { isSmaller } = useSmallerResolution({ width: 680 });
	const { onClickHandler, avatar, lastMessage, nickname, isActive } = props;

	return (
		<StyledListElement
			onClick={onClickHandler}
			isActive={isActive}
			nonBorder={isSmaller}
		>
			<Avatar
				src={avatar}
				size={isSmaller ? "6rem" : "4rem"}
				border
			/>
			{!isSmaller && (
				<Box>
					<Heading as="h3">{nickname}</Heading>
					<Message>{lastMessage}</Message>
				</Box>
			)}
		</StyledListElement>
	);
};

export default ChatsListElement;
