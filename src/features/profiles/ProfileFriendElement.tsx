import styled from "styled-components";
import { flexColumn } from "../../style/Templates";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import { Button } from "../../ui/Button";

const StyledElement = styled.div`
	${flexColumn};
	border: var(--border-normal);
	border-radius: var(--border-radius-xsm);
	background-color: var(--color-primary-400);
	padding-bottom: var(--padding-sm);
	width: 30%;
	height: 40%;
	overflow: hidden;
	transition: var(--transition-all-3);

	&:hover {
		cursor: pointer;
		background-color: var(--color-primary-300);
		border-color: var(--color-secondary-100);
	}
`;

const Nickname = styled(Heading)`
	padding: var(--padding-sm);
`;

const ViewProfile = styled(Button)`
	font-size: 1.4rem;
	border-radius: var(--border-radius-xsm);
	margin: 0 var(--padding-sm);
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
				width="100%"
				src={avatar}
				square
			/>
			<Nickname as="h3">{nickname}</Nickname>
			<ViewProfile size="medium">View profile</ViewProfile>
		</StyledElement>
	);
};

export default ProfileFriendElement;
