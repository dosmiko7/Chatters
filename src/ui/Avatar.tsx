import styled from "styled-components";

import { flexCentered } from "../style/Templates";

interface IStyledAvatarProps {
	size: string;
	square?: boolean;
}

const StyledAvatar = styled.div<IStyledAvatarProps>`
	${flexCentered};
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: ${(props) => (props.square ? "0" : "50%")};
	overflow: hidden;

	&:hover {
		cursor: pointer;
	}
`;

const Image = styled.img`
	max-width: 100%;
	object-fit: contain;
`;

// TODO: Change avatar's image to the one downloaded from the server
// TODO: Clicking on Avatar moves user to Avatar's owner's profile
// TODO: If user is currently active change border to green
interface IAvatar {
	size: string;
	square?: boolean;
	src?: string;
	onClick?: () => void;
}

const Avatar = (props: IAvatar) => {
	const { size, src, square, onClick } = props;

	return (
		<StyledAvatar
			size={size}
			square={square}
			onClick={onClick}
		>
			<Image
				src={src || "avatar-default.png"}
				alt="Avatar"
			/>
		</StyledAvatar>
	);
};

export default Avatar;
