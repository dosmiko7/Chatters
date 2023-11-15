import styled from "styled-components";
import { Container } from "../../ui/Container";
import Heading from "../../ui/Heading";
import SearchBar from "../../ui/SearchBar";
import PrivatesChatsContainer from "./PrivatesChatsContainer";

const StyledChatsBar = styled(Container)`
	max-width: 100%;
`;

const ChatsBar = () => {
	return (
		<StyledChatsBar>
			<Heading as="h2">Chats</Heading>
			<SearchBar />
			<PrivatesChatsContainer />
		</StyledChatsBar>
	);
};

export default ChatsBar;
