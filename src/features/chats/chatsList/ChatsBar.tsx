import styled from "styled-components";

import Container from "../../../ui/Container";
import Heading from "../../../ui/Heading";
import SearchBar from "../../../ui/SearchBar";
import ChatsListContainer from "./ChatsListContainer";

const StyledChatsBar = styled(Container)`
	max-width: 100%;
`;

//TODO: SearchBar should let display friends which nicknames contain input
const ChatsBar = () => {
	return (
		<StyledChatsBar>
			<Heading as="h2">Chats</Heading>
			<SearchBar />
			<ChatsListContainer />
		</StyledChatsBar>
	);
};

export default ChatsBar;
