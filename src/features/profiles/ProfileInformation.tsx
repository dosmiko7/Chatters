import styled from "styled-components";

import { IDocumentData } from "../../services/firestore/userApi";
import { flexColumn, flexRow } from "../../style/Templates";
import Heading from "../../ui/Heading";
import Paragraph from "../../ui/Paragraph";
import Avatar from "../../ui/Avatar";
import ProfileSocials from "./ProfileSocials";
import ProfileButtons from "./ProfileButtons";
import ProfilePersonals from "./ProfilePersonals";

const StyledProfileInformation = styled.div`
	${flexColumn};
	position: relative;
`;

interface IBackground {
	src: string;
}

const Background = styled.div<IBackground>`
	height: 30%;
	background-image: url(${(props) => props.src});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Main = styled.div`
	${flexColumn};
	align-items: center;
	flex: 1;
	gap: 0.4rem;
	margin-top: -6rem;
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
			<Background src={background} />
			<Main>
				<Avatar
					size="12rem"
					src={avatar}
				/>
				<Heading as="h2">{nickname}</Heading>
				<Heading as="h3">{email}</Heading>
				<Row>
					<ProfilePersonals personals={personals} />
					<ProfileSocials socials={socials} />
				</Row>
				<ProfileButtons profileData={profileData} />
			</Main>
			<Addition>
				<Heading as="h3">Description</Heading>
				<Paragraph>{description}</Paragraph>
			</Addition>
		</StyledProfileInformation>
	);
};

export default ProfileInformation;
