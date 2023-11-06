import styled from "styled-components";
import { DocumentData } from "firebase/firestore";

import { flexColumn } from "../../style/Templates";
import Heading from "../../ui/Heading";
import Paragraph from "../../ui/Paragraph";
import { Avatar } from "../../ui/Avatar";
import ProfileSocials from "./ProfileSocials";

const StyledProfileInformation = styled.div`
	${flexColumn};
`;

interface IBackground {
	src: string;
}

const MainInformation = styled.div<IBackground>`
	${flexColumn};
	align-items: center;
	padding-top: 20%;
	flex: 1;
	gap: 0.4rem;
	position: relative;
	background-image: linear-gradient(170deg, transparent 0%, transparent 40%, var(--color-primary-300) 47%),
		url(${(props) => props.src});
`;

const AdditionalInformation = styled.div`
	${flexColumn};
	flex: 1;
	padding: 0 var(--padding-lg);
	max-height: 40%;
`;

const ProfileInformation = ({ profileData }: { profileData: DocumentData }) => {
	const { avatar, background, nickname, email, description, socials } = profileData.data;

	return (
		<StyledProfileInformation>
			<MainInformation src={background}>
				<Avatar
					width="12rem"
					src={avatar}
				/>
				<Heading as="h2">{nickname}</Heading>
				<Heading as="h3">{email}</Heading>
				<ProfileSocials socials={socials} />
			</MainInformation>
			<AdditionalInformation>
				<Heading as="h3">Description</Heading>
				<Paragraph>{description}</Paragraph>
			</AdditionalInformation>
		</StyledProfileInformation>
	);
};

export default ProfileInformation;
