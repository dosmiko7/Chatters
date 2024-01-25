import { OAuthCredential, UserCredential } from "firebase/auth";
import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import * as authApiFunctions from "../../../services/auth/authApi";
import useLogin from "../useLogin";
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

describe("useLogin", () => {
	test("should set matching queries and navigate to '/dashboard' if promise was resolved", async () => {
		vi.spyOn(authApiFunctions, "signIn").mockResolvedValueOnce({
			authCredential: { providerId: "authCredentialProviderId" } as OAuthCredential,
			userCredential: { user: { uid: "testUserId" } } as UserCredential,
		});

		expect(JSON.stringify(queryClient.getQueryData(["loggedUser"]))).toBe(undefined);
		expect(JSON.stringify(queryClient.getQueryData(["emailAuthCredential"]))).toBe(undefined);

		const { result } = renderHook(() => useLogin(), { wrapper });

		act(() => result.current.login({ email: "testEmail@.com", password: "testPassword1!" }));

		await waitFor(() => expect(result.current.status).toBe("success"));
		expect(useNavigateMock).toBeCalledWith("/dashboard", { replace: true });
		expect(JSON.stringify(queryClient.getQueryData(["loggedUser"]))).toBe(`{"uid":"testUserId"}`);
		expect(JSON.stringify(queryClient.getQueryData(["emailAuthCredential"]))).toBe(
			`{"providerId":"authCredentialProviderId"}`
		);
	});

	test("should call toast.error and console.error if promise was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(authApiFunctions, "reauthenticateAccount").mockResolvedValueOnce();

		const { result } = renderHook(() => useLogin(), { wrapper });

		act(() => result.current.login({ email: "testEmail@.com", password: "testPassword1!" }));

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Provided email or password are incorrect");
		expect(errorSpy).toBeCalled();
	});
});
