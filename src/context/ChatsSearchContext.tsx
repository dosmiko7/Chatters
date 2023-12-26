import { useState, createContext, ReactNode } from "react";

interface ChatsSearchContextProps {
	searchValue: string;
	enterSearchValue: (input: string) => void;
}

const defaultValues: ChatsSearchContextProps = {
	searchValue: "",
	enterSearchValue: () => {},
};

export const ChatsSearchContext = createContext(defaultValues);

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
