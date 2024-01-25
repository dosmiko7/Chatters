import { User } from "firebase/auth";
import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useLoggedUserHooks from "../useLoggedUser";
import * as useEmailAuthCredentialHooks from "../../settings/reauthenticate/useEmailAuthCredential";
import * as useGoogleAuthCredentialHooks from "../../settings/reauthenticate/useGoogleAuthCredential";
import * as authApiFunctions from "../../../services/auth/authApi";
import * as userApiFunctions from "../../../services/firestore/userApi";
import { queryClient, wrapper } from "./wrapper";
import useDeleteAccount from "../useDeleteAccount";

vi.mock("react-hot-toast");

const useNavigateMock = vi.fn();
vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
	};
});

queryClient.setQueryData(["test"], { data: "test" });

describe("useDeleteAccount", () => {
	beforeEach(() => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: { uid: "testUserId" } as User });
		vi.spyOn(useEmailAuthCredentialHooks, "default").mockReturnValue(undefined);
		vi.spyOn(useGoogleAuthCredentialHooks, "default").mockReturnValue(undefined);
	});

	test("should call toast.success, navigate and remove all queries if the toast was resolved", async () => {
		vi.spyOn(authApiFunctions, "reauthenticateAccount").mockResolvedValueOnce();
		vi.spyOn(userApiFunctions, "deleteUser").mockResolvedValueOnce();

		const queryData = queryClient.getQueryData(["test"]);
		expect(JSON.stringify(queryData)).toBe(`{"data":"test"}`);
		const { result } = renderHook(() => useDeleteAccount(), { wrapper });

		act(() => result.current.deleteAccount());

		await waitFor(() => expect(result.current.status).toBe("success"));
		expect(toast.success).toBeCalledWith("We have deleted your account successfully");
		expect(useNavigateMock).toBeCalledWith("/login");
		expect(JSON.stringify(queryClient.getQueryData(["test"]))).toBe(undefined);
	});

	test("should call toast.error and console.error if the toast was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(authApiFunctions, "reauthenticateAccount").mockResolvedValueOnce();
		vi.spyOn(userApiFunctions, "deleteUser").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useDeleteAccount(), { wrapper });

		act(() => result.current.deleteAccount());

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Account deletion failed");
		expect(errorSpy).toBeCalled();
	});
});
