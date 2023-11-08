import { QueryClient, QueryKey } from "@tanstack/react-query";

export const getQueryKeys = (queryClient: QueryClient) => {
	const queryCache = queryClient.getQueryCache();
	const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

	return queryKeys;
};

export const getSpecificQueriesData = <T>(queryClient: QueryClient, queries: QueryKey[]): T[] => {
	const data: T[] = [];
	queries.forEach((query) => {
		const queryData = queryClient.getQueryData<T | undefined>(query);
		if (queryData) {
			data.push(queryData);
		}
	});
	return data;
};
