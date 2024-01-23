import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ChatsSearchProvider from "../../../../context/ChatsSearchContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const ChatsSearchWrapper = ({ children }: { children: JSX.Element }) => {
	return <ChatsSearchProvider>{children}</ChatsSearchProvider>;
};

export const QueryWrapper = ({ children }: { children: JSX.Element }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
