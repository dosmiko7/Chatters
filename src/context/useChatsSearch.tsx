import { useContext } from "react";

import { ChatsSearchContext } from "./ChatsSearchContext";

export const useChatsSearch = () => {
	const context = useContext(ChatsSearchContext);
	if (context === undefined) {
		throw new Error("ChatsSearchContext was used outside of ChatsSearchProvider");
	}

	return context;
};

export default useChatsSearch;
