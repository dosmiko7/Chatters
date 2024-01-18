import styled from "styled-components";

import { flexColumn } from "../../../style/Templates";
import Heading from "../../../ui/Heading";
import ProfileFormSocialLinkedin from "./ProfileFormSocialLinkedin";
import ProfileFormSocialGitHub from "./ProfileFormSocialGitHub";
import ProfileFormSocialTwitter from "./ProfileFormSocialTwitter";

const StyledSocials = styled.div``;

const FlexColumn = styled.div`
	${flexColumn};
`;

const ProfileFormSocials = () => {
	return (
		<StyledSocials>
			<Heading as="h3">Socials</Heading>
			<FlexColumn>
				<ProfileFormSocialLinkedin />
				<ProfileFormSocialGitHub />
				<ProfileFormSocialTwitter />
			</FlexColumn>
		</StyledSocials>
	);
};

export default ProfileFormSocials;
