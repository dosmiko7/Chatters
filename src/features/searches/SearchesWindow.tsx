import styled from "styled-components";
import { useState } from "react";

import SearchBar from "../../ui/SearchBar";
import SearchesList from "./SearchesList";
import { Form } from "../../ui/Form";
import Heading from "../../ui/Heading";

const StyledSearchesWindow = styled.div`
	width: 40rem;
	height: 60rem;
`;

const ListContainer = styled.div`
	max-height: 80%;
	overflow-y: scroll;
`;

const SearchesWindow = () => {
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
			<Heading as="h2">Find a user</Heading>
			<Form onSubmit={handleOnSubmit}>
				<SearchBar
					placeholder="Type nickname/email"
					onChangeHandler={handleInputChange}
					onIconClickHandler={handleOnSubmit}
				/>
			</Form>
			<ListContainer>{query !== "" && <SearchesList query={query} />}</ListContainer>
		</StyledSearchesWindow>
	);
};

export default SearchesWindow;
