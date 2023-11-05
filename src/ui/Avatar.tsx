import styled from "styled-components";
import { flexCentered } from "../style/Templates";

interface IStyledAvatarProps {
	width: string;
}

const StyledAvatar = styled.div<IStyledAvatarProps>`
	${flexCentered};
	width: ${(props) => props.width};
	border-radius: 50%;
	overflow: hidden;
`;

const Image = styled.img`
	max-width: 100%;
	object-fit: contain;
`;

// TODO: Change avatar's image to the one downloaded from the server
// TODO: Clicking on Avatar moves user to Avatar's owner's profile
// TODO: If user is currently active change border to green
interface IAvatar {
	width: string;
	src?: string;
}

export const Avatar = (props: IAvatar) => {
	const { width, src } = props;

	return (
		<StyledAvatar width={width}>
			<Image
				src={src || "avatar-default.png"}
				alt="Avatar"
			/>
		</StyledAvatar>
	);
};
