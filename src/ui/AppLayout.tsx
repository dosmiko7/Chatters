import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { breakpoints } from "../style/GlobalStyles";
import Sidebar from "./Sidebar";
import ChatsBar from "../features/chats/chatsList/ChatsBar";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 0.6fr minmax(0, 3fr) 11fr;
	max-width: 100dvw;
	height: 100dvh;
	max-height: 100dvh;

	@media only screen and (width <= ${breakpoints.tabletScreen}) {
		grid-template-rows: 0.6fr 11fr;
		grid-template-columns: minmax(0, 3fr) 11fr;
	}

	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		grid-template-rows: 0.6fr 1fr 11fr;
		grid-template-columns: 1fr;
	}
`;

const Main = styled.div`
	position: relative;
	background-color: var(--color-primary-400);
	height: 100%;
	max-height: 100%;
	max-width: 100%;
	overflow-y: scroll;

	@media only screen and (width <= ${breakpoints.tabletScreen}) {
		grid-row: 2/3;
		grid-column: 2/3;
	}

	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		grid-row: 3/4;
		grid-column: 1/-1;
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
