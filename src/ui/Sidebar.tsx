import styled from "styled-components";

import { Container } from "./Container";
import { flexColumn } from "../style/Templates";
import Logo from "./Logo";
import ProfileSearches from "../features/profiles/ProfileSearches";
import Settings from "./Settings";
import ThemeChanger from "./ThemeChanger";
import ProfileLoggedUser from "../features/profiles/ProfileLoggedUser";
import Logout from "./Logout";

const StyledSidebar = styled(Container)`
	${flexColumn};
	align-items: center;
	justify-content: space-between;
`;

const Box = styled.div`
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
