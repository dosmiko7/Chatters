import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Chats from "../features/chats/Chats";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 0.6fr minmax(0, 3fr) 11fr;
	height: 100vh;
	width: 100vw;
`;

const Main = styled.div``;

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
