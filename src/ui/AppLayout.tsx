import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Chats from "../features/chats/Chats";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr 7fr;
	height: 100vh;
`;

const Main = styled.div`
	min-width: 100%;
`;

const AppLayout = () => {
	return (
		<StyledAppLayout>
			<Sidebar />
			<Chats />
			<Main>
				<Outlet />
			</Main>
		</StyledAppLayout>
	);
};

export default AppLayout;
