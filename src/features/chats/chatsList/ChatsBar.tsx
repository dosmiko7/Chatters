import styled from "styled-components";

import { breakpoints } from "../../../style/GlobalStyles";
import { flexColumn, flexRow } from "../../../style/Templates";
import ChatsSearchProvider from "../../../context/ChatsSearchContext";
import Container from "../../../ui/Container";
import FlexColumn from "../../../ui/FlexColumn";
import Heading from "../../../ui/Heading";
import ChatsSearch from "./ChatsSearch";
import ChatsListContainer from "./ChatsListContainer";

const StyledChatsBar = styled(Container)`
	${flexColumn};
	width: 100%;
	max-width: 100dvw;
	height: 100%;
	max-height: 100%;
	background-color: var(--color-primary-300);

	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		${flexRow};
		gap: 1rem;
	}
`;

const SearchBox = styled(FlexColumn)`
	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		width: 30%;
	}
`;

const ChatsBar = () => {
	return (
		<ChatsSearchProvider>
			<StyledChatsBar>
				<SearchBox>
					<Heading as="h2">Chats</Heading>
					<ChatsSearch />
				</SearchBox>
				<ChatsListContainer />
			</StyledChatsBar>
		</ChatsSearchProvider>
	);
};

export default ChatsBar;
