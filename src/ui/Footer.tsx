import styled from "styled-components";

import { flexColumn, flexRow } from "../style/Templates";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import Social from "./Social";

const StyledFooter = styled.footer`
	${flexRow};
	align-items: center;
	justify-content: space-around;
	background-color: var(--color-primary-400);
	height: 10%;
`;

const SocialsBox = styled.div`
	${flexColumn};
	align-items: center;
	width: 10%;
`;

const Socials = styled.nav`
	${flexRow};
	gap: 2rem;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<Paragraph>&copy; Created by Mikołaj Oberda</Paragraph>
			<SocialsBox>
				<Heading as="h3">My socials</Heading>
				<Socials>
					<Social
						network="linkedin"
						label="Linkedin"
						href="https://www.linkedin.com/in/miko%C5%82ajoberda/"
						style={{ width: 35, height: 35 }}
					/>

					<Social
						network="github"
						label="GitHub"
						href="https://github.com/dosmiko7"
						style={{ width: 35, height: 35 }}
					/>
				</Socials>
			</SocialsBox>
		</StyledFooter>
	);
};

export default Footer;
