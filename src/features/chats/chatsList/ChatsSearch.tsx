import { ChangeEvent, useContext } from "react";

import { ChatsSearchContext } from "../../../context/ChatsSearchContext";
import SearchBar from "../../../ui/SearchBar";

const ChatsSearch = () => {
	const { enterSearchValue } = useContext(ChatsSearchContext);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		enterSearchValue(event.target.value);
	};

	return <SearchBar onChangeHandler={handleInputChange} />;
};

export default ChatsSearch;
