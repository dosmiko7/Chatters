import styled from "styled-components";
import { flexCentered } from "../style/Templates";

const StyledAvatar = styled.div`
	${flexCentered};
`;

const Image = styled.img`
	max-width: 100%;
`;

// TODO: Change avatar's image to the one downloaded from the server

export const Avatar = () => {
	return (
		<StyledAvatar>
			<Image
				src="avatar-default.png"
				alt="Avatar"
			/>
		</StyledAvatar>
	);
};
