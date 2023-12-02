import styled from "styled-components";

import { Container } from "./Container";
import { flexColumn } from "../style/Templates";
import { Wrapper } from "./Wrapper";
import { Avatar } from "./Avatar";
import Logout from "./Logout";
import Logo from "./Logo";
import Searches from "../features/searches/Searches";
import ThemeChanger from "./ThemeChanger";

const StyledSidebar = styled(Container)`
	${flexColumn};
	align-items: center;
	justify-content: space-between;
`;

const Box = styled(Wrapper)`
	${flexColumn};
	align-items: center;
	gap: 0.6rem;
	max-width: 50%;
`;

const Sidebar = () => {
	return (
		<StyledSidebar>
			<Box>
				<Logo />
				<Searches />
			</Box>
			<Box>
				<ThemeChanger />
				<Avatar size="4rem" />
				<Logout />
			</Box>
		</StyledSidebar>
	);
};

export default Sidebar;
