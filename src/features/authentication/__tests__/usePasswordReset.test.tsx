import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import * as authApiFunctions from "../../../services/auth/authApi";
import usePasswordReset from "../usePasswordReset";
import { wrapper } from "./wrapper";

vi.mock("react-hot-toast");

describe("usePasswordReset", () => {
	test("should call toast.success if promise was resolved", async () => {
		vi.spyOn(authApiFunctions, "sendPasswordReset").mockResolvedValueOnce();

		const { result } = renderHook(() => usePasswordReset(), { wrapper });

		act(() => result.current.sendResetEmail({ email: "testEmail@.com" }));

		await waitFor(() => expect(result.current.status).toBe("success"));
		expect(toast.success).toBeCalledWith("We have sent a message. Check your email");
	});

	test("should call toast.error and console.error if promise was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(authApiFunctions, "sendPasswordReset").mockRejectedValueOnce("error");

		const { result } = renderHook(() => usePasswordReset(), { wrapper });

		act(() => result.current.sendResetEmail({ email: "testEmail@.com" }));

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Something went wrong. Try again later.");
		expect(errorSpy).toBeCalled();
	});
});
