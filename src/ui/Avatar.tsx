import styled from "styled-components";

import { flexCentered } from "../style/Templates";

interface IStyledAvatarProps {
	size: string;
	square?: boolean;
	border?: boolean;
}

const StyledAvatar = styled.div<IStyledAvatarProps>`
	${flexCentered};
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: ${(props) => (props.square ? "0" : "50%")};
	overflow: hidden;
	border: ${(props) => (props.border ? "var(--border-thin)" : "none")};

	&:hover {
		cursor: pointer;
	}
`;

interface IAvatar {
	size: string;
	square?: boolean;
	src?: string | null;
	border?: boolean;
	onClick?: () => void;
}

const Avatar = (props: IAvatar) => {
	const { size, src, square, border, onClick } = props;

	return (
		<StyledAvatar
			size={size}
			square={square}
			onClick={onClick}
			border={border}
			aria-label="Avatar container"
		>
			<img
				src={src || "avatar-default.png"}
				alt="Avatar"
				style={{ width: "100%", height: "100%", objectFit: "cover" }}
			/>
		</StyledAvatar>
	);
};

export default Avatar;
