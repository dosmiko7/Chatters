import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
			<LazyLoadImage
				src={src || "avatar-default.png"}
				alt="Avatar"
				effect="blur"
				style={{ width: `${size}`, height: `${size}` }}
			/>
		</StyledAvatar>
	);
};

export default Avatar;
