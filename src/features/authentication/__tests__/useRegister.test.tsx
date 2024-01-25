import { toast } from "react-hot-toast";
import { User, UserCredential } from "firebase/auth";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import * as authApiFunctions from "../../../services/auth/authApi";
import * as userApiFunctions from "../../../services/firestore/userApi";
import useRegister from "../useRegister";
import { wrapper } from "./wrapper";

vi.mock("react-hot-toast");

const useNavigateMock = vi.fn();
vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
	};
});

describe("useRegister", () => {
	test("should call toast.succes, call sendVerificationLink and navigate to '/login' if promise was resolved", async () => {
		vi.spyOn(authApiFunctions, "signUp").mockResolvedValueOnce({ user: { uid: "testUserId" } } as UserCredential);
		vi.spyOn(userApiFunctions, "addUser").mockResolvedValueOnce({} as User);
		const sendVeriLinkSpy = vi.spyOn(authApiFunctions, "sendVerificationLink").mockResolvedValueOnce();

		const { result } = renderHook(() => useRegister(), { wrapper });

		act(() => result.current.register({ email: "testEmail@.com", password: "testPassword1!" }));

		await waitFor(() => expect(result.current.status).toBe("success"));
		expect(useNavigateMock).toBeCalledWith("/login", { replace: true });
		expect(sendVeriLinkSpy).toBeCalled();
		expect(toast.success).toBeCalledWith("Your account has been created! We have sent you an account activation link");
	});

	test("should call toast.error and console.error if promise was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(authApiFunctions, "signUp").mockRejectedValueOnce("error");
		vi.spyOn(userApiFunctions, "addUser").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useRegister(), { wrapper });

		act(() => result.current.register({ email: "testEmail@.com", password: "testPassword1!" }));

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Register failed");
		expect(errorSpy).toBeCalled();
	});
});
