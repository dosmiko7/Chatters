import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import ChatsBar from "../features/chats/chatsList/ChatsBar";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 0.6fr minmax(0, 3fr) 11fr;
	height: 100vh;
	width: 100vw;
`;

const Main = styled.div`
	position: relative;
	background-color: var(--color-primary-400);
`;

const AppLayout = () => {
	return (
		<StyledAppLayout>
			<Sidebar />
			<ChatsBar />
			<Main>
				<Outlet />
			</Main>
		</StyledAppLayout>
	);
};

export default AppLayout;
