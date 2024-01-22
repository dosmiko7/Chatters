import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import * as userApiFunctions from "../../../services/firestore/userApi";
import useProfile from "../useProfile";

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

const useParamsExampleData: { userId: string | undefined } = { userId: "testUserId" };

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useParams: () => useParamsExampleData,
	};
});

describe("useProfile", () => {
	test("should return success status and fetchedData if the promise was successfully resolved", async () => {
		vi.spyOn(userApiFunctions, "getUser").mockResolvedValueOnce({ id: "testId" } as userApiFunctions.IDocumentData);

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(() => expect(result.current.status).toBe("success"));
		await waitFor(() => {
			expect(JSON.stringify(result.current.profileData)).toBe(`{"id":"testId"}`);
		});
		await waitFor(() => {
			expect(JSON.stringify(queryClient.getQueryData(["profile", "testUserId"]))).toBe('{"id":"testId"}');
		});
	});

	test("should return error status if the promise was rejected", async () => {
		vi.spyOn(userApiFunctions, "getUser").mockRejectedValueOnce("test");

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(() => expect(result.current.status).toBe("error"));
	});
});
