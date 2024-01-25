import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const wrapper = ({ children }: { children: JSX.Element }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
