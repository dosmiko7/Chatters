import styled from "styled-components";
import { flexCentered } from "../style/Templates";

const StyledAvatar = styled.div`
	${flexCentered};
	width: 4rem;
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
	src?: string;
}

export const Avatar = (props: IAvatar) => {
	const { src } = props;

	return (
		<StyledAvatar>
			<Image
				src={src || "avatar-default.png"}
				alt="Avatar"
			/>
		</StyledAvatar>
	);
};
