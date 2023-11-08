import styled from "styled-components";

import { flexColumn, flexRow } from "../../style/Templates";
import Heading from "../../ui/Heading";
import Paragraph from "../../ui/Paragraph";
import { Avatar } from "../../ui/Avatar";
import { IDocumentData } from "../../services/firestore";
import ProfileSocials from "./ProfileSocials";
import ProfileButtons from "./ProfileButtons";
import ProfilePersonals from "./ProfilePersonals";

const StyledProfileInformation = styled.div`
	${flexColumn};
`;

interface IBackground {
	src: string;
}

const Main = styled.div<IBackground>`
	${flexColumn};
	align-items: center;
	padding-top: 20%;
	flex: 1;
	gap: 0.4rem;
	position: relative;
	background-image: linear-gradient(170deg, transparent 0%, transparent 40%, var(--color-primary-300) 47%),
		url(${(props) => props.src});
`;

const Row = styled.div`
	${flexRow};
	width: 80%;
	justify-content: space-between;
`;

const Addition = styled.div`
	${flexColumn};
	flex: 1;
	padding: 0 var(--padding-lg);
	max-height: 40%;
`;

const ProfileInformation = ({ profileData }: { profileData: IDocumentData }) => {
	const { avatar, background, nickname, email, description, personals, socials } = profileData.data;

	return (
		<StyledProfileInformation>
			<Main src={background}>
				<Avatar
					width="12rem"
					src={avatar}
				/>
				<Heading as="h2">{nickname}</Heading>
				<Heading as="h3">{email}</Heading>
				<Row>
					<ProfilePersonals personals={personals} />
					<ProfileSocials socials={socials} />
				</Row>
				<ProfileButtons />
			</Main>
			<Addition>
				<Heading as="h3">Description</Heading>
				<Paragraph>{description}</Paragraph>
			</Addition>
		</StyledProfileInformation>
	);
};

export default ProfileInformation;
