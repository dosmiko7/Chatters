import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { breakpoints } from "../style/GlobalStyles";
import { flexColumn, flexRow } from "../style/Templates";
import Heading from "./Heading";
import FlexColumn from "./FlexColumn";

const StyledWelcomeBanner = styled(FlexColumn)`
	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		align-items: center;
		justify-content: center;
	}
`;

const PageName = styled.div`
	${flexRow};
	align-items: center;

	h1 {
		font-size: 14rem;
		color: var(--logo-color);
		margin: 0;

		@media only screen and (width <= ${breakpoints.laptopScreen}) {
			font-size: 10rem;
		}

		@media only screen and (width <= ${breakpoints.smallSmartphoneScreen}) {
			font-size: 7rem;
		}
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

		@media only screen and (width <= ${breakpoints.laptopScreen}) {
			font-size: 6rem;
		}

		@media only screen and (width <= ${breakpoints.smallSmartphoneScreen}) {
			font-size: 4rem;
		}
	}

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		${flexRow};
		width: 80%;
		justify-content: space-evenly;
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
				<Heading
					as="h2"
					center
				>
					Connect
				</Heading>
				<Heading
					as="h2"
					center
				>
					& Talk
				</Heading>
			</SubHeadings>
		</StyledWelcomeBanner>
	);
};

export default WelcomeBanner;
