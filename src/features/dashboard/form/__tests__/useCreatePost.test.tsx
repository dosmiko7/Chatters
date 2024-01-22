import { User } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { toast } from "react-hot-toast";

import { IDashboardFormInput } from "../DashboardForm";
import * as dashboardApiFunctions from "../../../../services/firestore/dashboardApi";
import * as useLoggedUserHooks from "../../../authentication/useLoggedUser";
import useCreatePost from "../useCreatePost";

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

describe("useCreatePost", () => {
	vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: {} as User });

	test("should return success status and call toast.success if the promise was successfully resolved", async () => {
		vi.spyOn(dashboardApiFunctions, "addDashboardPost").mockResolvedValueOnce();

		const { result } = renderHook(() => useCreatePost(), { wrapper });
		act(() => {
			result.current.createPost({} as IDashboardFormInput);
		});

		await waitFor(() => expect(result.current.status).toBe("success"));
		await waitFor(() => expect(toast.success).toBeCalledWith("New post created successfully"));
	});

	test("should return error status, call toast.error and console.error if the promise was rejected", async () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(dashboardApiFunctions, "addDashboardPost").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useCreatePost(), { wrapper });
		act(() => {
			result.current.createPost({} as IDashboardFormInput);
		});

		await waitFor(() => expect(result.current.status).toBe("error"));
		await waitFor(() => expect(toast.error).toBeCalledWith("Adding a post failed"));
		expect(consoleErrorSpy).toBeCalled();
	});
});
