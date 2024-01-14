import { ChangeEvent } from "react";

import useChatsSearch from "../../../context/useChatsSearch";
import SearchBar from "../../../ui/SearchBar";

const ChatsSearch = () => {
	const { enterSearchValue } = useChatsSearch();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		enterSearchValue(event.target.value);
	};

	return <SearchBar onChangeHandler={handleInputChange} />;
};

export default ChatsSearch;
