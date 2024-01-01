import styled from "styled-components";

import { flexColumn, flexRow } from "../../style/Templates";
import Heading from "../../ui/Heading";
import Social from "../../ui/Social";
import Info from "../../ui/Info";

const StyledSocials = styled.div`
	${flexRow}
	padding: var(--padding-sm);
	gap: var(--padding-sm);
`;

const StyledProfileSocials = styled.div`
	${flexColumn}
`;

interface ISocials {
	socials: {
		github?: string;
		linkedin?: string;
		twitter?: string;
	};
}

const ProfileSocials = ({ socials }: ISocials) => {
	const { github, linkedin, twitter } = socials;

	const noSocials = <Info>No social media.</Info>;
	const hasSocials = (
		<StyledSocials>
			{linkedin && (
				<Social
					network="linkedin"
					label="Linkedin"
					href={linkedin}
				/>
			)}
			{github && (
				<Social
					network="github"
					label="GitHub"
					href={github}
				/>
			)}
			{twitter && (
				<Social
					network="x"
					label="X"
					href={twitter}
				/>
			)}
		</StyledSocials>
	);

	return (
		<StyledProfileSocials>
			<Heading
				as="h3"
				center
			>
				Socials
			</Heading>
			{Object.keys(socials).length ? hasSocials : noSocials}
		</StyledProfileSocials>
	);
};

export default ProfileSocials;
