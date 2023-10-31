import styled from "styled-components";

import { Container } from "./Container";
import { flexColumn } from "../style/Templates";
import { Wrapper } from "./Wrapper";
import { Avatar } from "./Avatar";
import Logout from "./Logout";
import Logo from "./Logo";
import SearchUsers from "./SearchUsers";

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
				<SearchUsers />
			</Box>
			<Box>
				<Avatar />
				<Logout />
			</Box>
		</StyledSidebar>
	);
};

export default Sidebar;
