import styled from "styled-components";
import { useState } from "react";

import SearchBar from "../../ui/SearchBar";
import SearchesList from "./SearchesList";
import { Form } from "../../ui/Form";

const StyledSearchesWindow = styled.div`
	width: 40rem;
	height: 60rem;
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
			<Form onSubmit={handleOnSubmit}>
				<SearchBar
					onChange={handleInputChange}
					onClick={handleOnSubmit}
				/>
			</Form>

			{query !== "" && <SearchesList query={query} />}
		</StyledSearchesWindow>
	);
};

export default SearchesWindow;
