import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { flexColumn, flexRow } from "../style/Templates";
import Heading from "./Heading";
import FlexColumn from "./FlexColumn";

const StyledWelcomeBanner = styled(FlexColumn)``;

const PageName = styled.div`
	${flexRow};
	align-items: center;

	h1 {
		font-size: 14rem;
		color: var(--logo-color);
		margin: 0;
	}
`;

const Logo = styled(LazyLoadImage)`
	width: 14rem;
	padding: var(--padding-sm);
`;

const SubHeadings = styled.div`
	${flexColumn};
	align-items: end;
	h2 {
		font-size: 8rem;
	}
`;

const WelcomeBanner = () => {
	return (
		<StyledWelcomeBanner>
			<PageName>
				<Logo
					src="/logo.png"
					alt="Logo"
				/>
				<Heading as="h1">Chatters</Heading>
			</PageName>
			<SubHeadings>
				<Heading as="h2">Connect</Heading>
				<Heading as="h2">& Talk</Heading>
			</SubHeadings>
		</StyledWelcomeBanner>
	);
};

export default WelcomeBanner;
