import styled from "styled-components";
import { Container } from "../../ui/Container";
import Heading from "../../ui/Heading";
import SearchBar from "../../ui/SearchBar";
import PrivateChats from "./PrivatesChats";

const StyledChats = styled(Container)`
	max-width: 100%;
`;

const Chats = () => {
	return (
		<StyledChats>
			<Heading as="h2">Chats</Heading>
			<SearchBar />
			<PrivateChats />
		</StyledChats>
	);
};

export default Chats;
