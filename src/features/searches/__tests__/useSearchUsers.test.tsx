import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import useSearchUsers from "../useSearchUsers";

import * as usersApiFunctions from "../../../services/firestore/userApi";
import { IDocumentData } from "../../../services/firestore/userApi";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useSearchUsers", () => {
	test("should return success status if the promise was successfully resolved", async () => {
		vi.spyOn(usersApiFunctions, "findUsers").mockImplementationOnce(
			(key: string) =>
				new Promise((resolve) => {
					resolve([{ id: key } as IDocumentData]);
				})
		);
		const { result } = renderHook(() => useSearchUsers("test"), { wrapper });

		await waitFor(() => expect(result.current.status).toBe("success"));
		await waitFor(() => {
			expect(JSON.stringify(result.current.data)).toBe(`[{"id":"test"}]`);
		});
	});

	test("should return error status if the promise was rejected", async () => {
		vi.spyOn(usersApiFunctions, "findUsers").mockImplementationOnce(() => Promise.reject(new Error("fail")));
		const { result } = renderHook(() => useSearchUsers("test"), { wrapper });

		await waitFor(() => expect(result.current.status).toBe("error"));
	});
});
