import styled from "styled-components";

import { flexRow } from "../../../../../style/Templates";
import ProfileFormAvatar from "./ProfileFormAvatar";
import ProfileFormBackground from "./ProfileFormBackground";

const StyledImages = styled.div`
	${flexRow}
	justify-content: space-between;
`;

const ProfileFormImages = ({ images }: { images: { avatar: string; background: string } }) => {
	const { avatar, background } = images;

	return (
		<StyledImages>
			<ProfileFormAvatar avatar={avatar} />
			<ProfileFormBackground background={background} />
		</StyledImages>
	);
};

export default ProfileFormImages;
