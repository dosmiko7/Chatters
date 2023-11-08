import styled from "styled-components";
import { flexRow } from "../../style/Templates";
import { SocialIcon } from "react-social-icons";

const StyledSocials = styled.div`
	${flexRow}
	padding: var(--padding-sm);
	gap: var(--padding-sm);
`;

const Social = styled.div`
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		width: 0;
		height: 0;
		transform: translate(-5%, -5%);
		border-radius: var(--border-radius-circle);
		background-color: var(--color-secondary-100);
		transition: var(--transition-all-3);
	}

	&:hover {
		&::before {
			height: 110%;
			width: 110%;
			top: 0;
		}
	}
`;

interface ISocials {
	socials: {
		github: string;
		linkedin: string;
		twitter: string;
	};
}

const ProfileSocials = ({ socials }: ISocials) => {
	const { github, linkedin, twitter } = socials;

	return (
		<StyledSocials>
			{linkedin && (
				<Social>
					<SocialIcon
						network="linkedin"
						style={{ height: 40, width: 40 }}
						label="Linkedin"
						href={linkedin}
						target="_blank"
					/>
				</Social>
			)}
			{github && (
				<Social>
					<SocialIcon
						network="github"
						style={{ height: 40, width: 40 }}
						label="GitHub"
						href={github}
						target="_blank"
					/>
				</Social>
			)}
			{twitter && (
				<Social>
					<SocialIcon
						network="x"
						style={{ height: 40, width: 40 }}
						label="X"
						href={twitter}
						target="_blank"
					/>
				</Social>
			)}
		</StyledSocials>
	);
};

export default ProfileSocials;
