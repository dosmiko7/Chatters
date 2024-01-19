import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import * as userApiFunctions from "../../../../services/firestore/userApi";
import { IProfileFormInput } from "../ProfileForm";
import useProfileFormSubmit from "../useProfileFormSubmit";

const testUseParamsData: { userId: string | undefined } = { userId: "testUserId" };

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useParams: () => testUseParamsData,
	};
});

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

describe("useProfileFormSubmit", () => {
	test("should set new query data on success resolve", async () => {
		vi.spyOn(userApiFunctions, "updateUserInfo").mockResolvedValue({ testData: "testDataResolve" });

		const { result } = renderHook(() => useProfileFormSubmit(), { wrapper });

		expect(result.current.status).toBe("idle");

		act(() => result.current.submit({} as IProfileFormInput));

		await waitFor(() => expect(result.current.status).toBe("success"));

		const expectedData = { id: "testUserId", data: { testData: "testDataResolve" } };

		const data = queryClient.getQueryData(["profile", "testUserId"]);
		expect(JSON.stringify(data)).toBe(JSON.stringify(expectedData));
	});

	test("should console error on reject", async () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(userApiFunctions, "updateUserInfo").mockRejectedValue("error");

		const { result } = renderHook(() => useProfileFormSubmit(), { wrapper });

		expect(result.current.status).toBe("idle");

		act(() => result.current.submit({} as IProfileFormInput));

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(consoleErrorSpy).toBeCalled();
	});
});
