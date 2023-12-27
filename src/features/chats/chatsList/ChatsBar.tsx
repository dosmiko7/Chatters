import styled from "styled-components";

import { flexColumn } from "../../../style/Templates";
import ChatsSearchProvider from "../../../context/ChatsSearchContext";
import Container from "../../../ui/Container";
import Heading from "../../../ui/Heading";
import ChatsSearch from "./ChatsSearch";
import ChatsListContainer from "./ChatsListContainer";

const StyledChatsBar = styled(Container)`
	${flexColumn}
	max-width: 100%;
	height: 100dvh;
	max-height: 100dvh;
	background-color: var(--color-primary-300);
`;

const ChatsBar = () => {
	return (
		<ChatsSearchProvider>
			<StyledChatsBar>
				<Heading as="h2">Chats</Heading>
				<ChatsSearch />
				<ChatsListContainer />
			</StyledChatsBar>
		</ChatsSearchProvider>
	);
};

export default ChatsBar;
