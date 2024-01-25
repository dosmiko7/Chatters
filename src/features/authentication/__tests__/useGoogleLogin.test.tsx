import { OAuthCredential, User, UserCredential } from "firebase/auth";
import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import * as authApiFunctions from "../../../services/auth/authApi";
import * as userApiFunctions from "../../../services/firestore/userApi";
import { queryClient, wrapper } from "./wrapper";
import useGoogleLogin from "../useGoogleLogin";

vi.mock("react-hot-toast");

const useNavigateMock = vi.fn();
vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
	};
});

describe("useGoogleLogin", () => {
	test("should call addUser, set matching queries and navigate to '/dashboard' if promise was resolved", async () => {
		vi.spyOn(authApiFunctions, "signInWithGoogle").mockResolvedValueOnce({
			authCredential: { providerId: "authCredentialProviderId" } as OAuthCredential,
			userCredential: { user: { uid: "testUserId" } } as UserCredential,
			isNewUser: true,
		});
		const addUserSpy = vi.spyOn(userApiFunctions, "addUser").mockResolvedValueOnce({} as User);

		const { result } = renderHook(() => useGoogleLogin(), { wrapper });

		expect(JSON.stringify(queryClient.getQueryData(["loggedUser"]))).toBe(undefined);
		expect(JSON.stringify(queryClient.getQueryData(["googleAuthCredential"]))).toBe(undefined);

		act(() => result.current.login());

		await waitFor(() => expect(result.current.status).toBe("success"));
		expect(useNavigateMock).toBeCalledWith("/dashboard", { replace: true });
		expect(JSON.stringify(queryClient.getQueryData(["loggedUser"]))).toBe(`{"uid":"testUserId"}`);
		expect(JSON.stringify(queryClient.getQueryData(["googleAuthCredential"]))).toBe(
			`{"providerId":"authCredentialProviderId"}`
		);
		expect(addUserSpy).toBeCalled();
	});

	test("should call toast.error and console.error if promise was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(authApiFunctions, "reauthenticateAccount").mockResolvedValueOnce();
		vi.spyOn(userApiFunctions, "deleteUser").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useGoogleLogin(), { wrapper });

		act(() => result.current.login());

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Google login failed");
		expect(errorSpy).toBeCalled();
	});
});
