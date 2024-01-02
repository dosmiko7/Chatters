import styled from "styled-components";

import { breakpoints } from "../../style/GlobalStyles";
import { flexColumn } from "../../style/Templates";
import Avatar from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import FlexColumn from "../../ui/FlexColumn";

const StyledElement = styled.div`
	${flexColumn};
	border: var(--border-normal);
	border-radius: var(--border-radius-xsm);
	background-color: var(--color-primary-400);
	padding-bottom: var(--padding-sm);
	width: 30%;
	height: 30rem;
	overflow: hidden;
	transition: var(--transition-all-3);

	& > * {
		height: 50%;
	}

	&:hover {
		cursor: pointer;
		background-color: var(--color-primary-300);
		border-color: var(--color-secondary-100);
	}

	@media only screen and (width <= ${breakpoints.tabletScreen}) {
		height: 28rem;
	}

	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		width: 30%;
		height: 30rem;
	}
`;

const Nickname = styled(Heading)`
	font-weight: var(--font-weight-bold);
	padding: var(--padding-sm);
`;

const ViewProfile = styled(Button)`
	font-size: 1.4rem;
	border-radius: var(--border-radius-xsm);
	margin: auto var(--padding-sm) 0;
`;

interface IProfileFriendElement {
	avatar: string;
	nickname: string;
	onClickHandler: () => void;
}

const ProfileFriendElement = ({ avatar, nickname, onClickHandler }: IProfileFriendElement) => {
	return (
		<StyledElement onClick={onClickHandler}>
			<Avatar
				size="auto"
				src={avatar}
				square
			/>
			<FlexColumn>
				<Nickname as="h3">{nickname}</Nickname>
				<ViewProfile size="medium">View profile</ViewProfile>
			</FlexColumn>
		</StyledElement>
	);
};

export default ProfileFriendElement;
