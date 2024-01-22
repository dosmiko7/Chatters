import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { toast } from "react-hot-toast";

import * as userApiFunctions from "../../../services/firestore/userApi";
import useFriendUpdate from "../useFriendUpdate";

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

describe("useFriendUpdate", () => {
	test("should return error status, call toast.error and console.error if the promise was rejected", async () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(userApiFunctions, "friendUpdate").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useFriendUpdate({ userId: "testUserId", profileId: "testProfileId" }), {
			wrapper,
		});

		act(() => {
			result.current.updateFriend("add");
		});

		await waitFor(() => expect(result.current.status).toBe("error"));
		await waitFor(() => expect(toast.error).toBeCalledWith("Sorry. Something went wrong."));
		expect(consoleErrorSpy).toBeCalled();
	});
});
