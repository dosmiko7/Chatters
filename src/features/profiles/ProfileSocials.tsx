import styled from "styled-components";
import { flexRow } from "../../style/Templates";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const StyledSocials = styled.div`
	${flexRow}
`;

const Social = styled.a``;

const ProfileSocials = ({ socials }: any) => {
	const { linkedin, github, twitter } = socials;
	return (
		<StyledSocials>
			{linkedin && (
				<Social
					href={linkedin}
					target="_blank"
				>
					<FaLinkedin />
				</Social>
			)}
			{github && (
				<Social
					href={github}
					target="_blank"
				>
					<FaGithub />
				</Social>
			)}
			{twitter && (
				<Social
					href={twitter}
					target="_blank"
				>
					<FaXTwitter />
				</Social>
			)}
		</StyledSocials>
	);
};

export default ProfileSocials;
