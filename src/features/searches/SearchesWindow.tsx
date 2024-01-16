import styled from "styled-components";
import { useState } from "react";

import SearchBar from "../../ui/SearchBar";
import SearchesList from "./SearchesList";
import Form from "../../ui/Form";
import Heading from "../../ui/Heading";
import Wrapper from "../../ui/Wrapper";

const StyledSearchesWindow = styled.div`
	width: 40rem;
	height: 60rem;
`;

const ListContainer = styled(Wrapper)`
	max-height: 80%;
	overflow-y: scroll;
`;

const SearchesWindow = ({ onClickHandler, heading }: { onClickHandler: (userId: string) => void; heading: string }) => {
	const [input, setInput] = useState<string>("");
	const [query, setQuery] = useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setQuery(input);
	};

	return (
		<StyledSearchesWindow>
			<Heading as="h2">{heading}</Heading>
			<Form onSubmit={handleOnSubmit}>
				<SearchBar
					placeholder="Type nickname"
					onChangeHandler={handleInputChange}
					onIconClickHandler={handleOnSubmit}
				/>
			</Form>
			<ListContainer>
				{query !== "" && (
					<SearchesList
						query={query}
						onClickHandler={onClickHandler}
					/>
				)}
			</ListContainer>
		</StyledSearchesWindow>
	);
};

export default SearchesWindow;
