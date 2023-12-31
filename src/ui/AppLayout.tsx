import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import ChatsBar from "../features/chats/chatsList/ChatsBar";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 0.6fr minmax(0, 3fr) 11fr;
	max-width: 100vw;

	@media only screen and (width <= 1000px) {
		grid-template-rows: 0.6fr 11fr;
		grid-template-columns: 3fr 11fr;
	}
`;

const Main = styled.div`
	position: relative;
	background-color: var(--color-primary-400);
	height: 100vh;
	max-height: 100vh;
	overflow-y: scroll;

	@media only screen and (width <= 1000px) {
		grid-row: 2/3;
		grid-column: 2/3;
	}
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
