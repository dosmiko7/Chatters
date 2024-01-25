import { User } from "firebase/auth";
import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import * as authApiFunctions from "../../../services/auth/authApi";
import useSignOut from "../useSignOut";
import { queryClient, wrapper } from "./wrapper";

vi.mock("react-hot-toast");

const useNavigateMock = vi.fn();
vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
	};
});

describe("useSignOut", () => {
	test("should call toast.succes, remove queries and navigate to '/login' if promise was resolved", async () => {
		vi.spyOn(authApiFunctions, "signOutUser").mockResolvedValueOnce({ uid: "testUserId" } as User);

		queryClient.setQueryData(["test"], { data: "test" });
		expect(JSON.stringify(queryClient.getQueryData(["test"]))).toBe(`{"data":"test"}`);

		const { result } = renderHook(() => useSignOut(), { wrapper });

		act(() => result.current.signOut());

		await waitFor(() => expect(result.current.status).toBe("success"));
		expect(useNavigateMock).toBeCalledWith("/login", { replace: true });
		expect(JSON.stringify(queryClient.getQueryData(["test"]))).toBe(undefined);
		expect(toast.success).toBeCalledWith("You have logged out successfully");
	});

	test("should call toast.error if promise was rejected", async () => {
		vi.spyOn(authApiFunctions, "signOutUser").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useSignOut(), { wrapper });

		act(() => result.current.signOut());

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Logout failed");
	});
});
