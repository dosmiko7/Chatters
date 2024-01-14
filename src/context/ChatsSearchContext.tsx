import { useState, createContext, ReactNode } from "react";

interface ChatsSearchContextProps {
	searchValue: string;
	enterSearchValue: (input: string) => void;
}

export const ChatsSearchContext = createContext<ChatsSearchContextProps | undefined>(undefined);

const ChatsSearchProvider = ({ children }: { children: ReactNode }) => {
	const [searchValue, setSearchValue] = useState<string>("");

	const enterSearchValue = (input: string) => {
		setSearchValue(input);
	};

	return (
		<ChatsSearchContext.Provider value={{ searchValue, enterSearchValue }}>{children}</ChatsSearchContext.Provider>
	);
};

export default ChatsSearchProvider;
