import styled from "styled-components";

import { Container } from "./Container";
import { flexColumn } from "../style/Templates";
import { Wrapper } from "./Wrapper";
import { Avatar } from "./Avatar";
import Logout from "./Logout";

const StyledSidebar = styled(Container)`
	${flexColumn};
	align-items: center;
	border-right: 1px solid var(--color-primary-200);
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
				<Avatar />
				<Logout />
			</Box>
		</StyledSidebar>
	);
};

export default Sidebar;
