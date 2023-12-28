import styled from "styled-components";

import { flexColumn } from "../style/Templates";
import ProfileSearches from "../features/profiles/ProfileSearches";
import ProfileLoggedUser from "../features/profiles/ProfileLoggedUser";
import Container from "./Container";
import Logo from "./Logo";
import Settings from "./Settings";
import ThemeChanger from "./ThemeChanger";
import Logout from "./Logout";

const StyledSidebar = styled(Container)`
	${flexColumn};
	align-items: center;
	justify-content: space-between;
	background-color: var(--color-primary-300);
`;

const Box = styled.div`
	${flexColumn};
	align-items: center;
	gap: 0.6rem;
	max-width: 50%;
`;

const Sidebar = () => {
	return (
		<StyledSidebar as="aside">
			<Box>
				<Logo />
				<ProfileSearches />
			</Box>
			<Box>
				<Settings />
				<ThemeChanger />
				<ProfileLoggedUser />
				<Logout />
			</Box>
		</StyledSidebar>
	);
};

export default Sidebar;
