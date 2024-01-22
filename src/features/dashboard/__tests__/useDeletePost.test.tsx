import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { toast } from "react-hot-toast";

import * as dashboardApiFunctions from "../../../services/firestore/dashboardApi";
import useDeletePost from "../useDeletePost";

vi.mock("react-hot-toast");

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("useDeletePost", () => {
	test("should return succes status and call toast.success if the promise was successfully resolved", async () => {
		vi.spyOn(dashboardApiFunctions, "removeDashboardPost").mockResolvedValueOnce();
		const { result } = renderHook(() => useDeletePost(), { wrapper });
		act(() => {
			result.current.deletePost("test");
		});

		await waitFor(() => expect(result.current.status).toBe("success"));
		await waitFor(() => expect(toast.success).toBeCalledWith("The post has been successfully deleted"));
	});

	test("should return error status, call toast.error and console.error if the promise was rejected", async () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(dashboardApiFunctions, "removeDashboardPost").mockRejectedValueOnce("error");
		const { result } = renderHook(() => useDeletePost(), { wrapper });
		act(() => {
			result.current.deletePost("test");
		});

		await waitFor(() => expect(result.current.status).toBe("error"));
		await waitFor(() => expect(toast.error).toBeCalled());
		expect(consoleErrorSpy).toBeCalled();
	});
});
