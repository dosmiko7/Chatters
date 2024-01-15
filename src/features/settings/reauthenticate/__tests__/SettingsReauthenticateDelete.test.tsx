import { EmailAuthCredential, OAuthCredential } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { wrapper as queryWrapper } from "./testingQuery";
import SettingsReauthenticateDelete from "../SettingsReauthenticateDelete";
import * as useEmailAuthCredentialHooks from "../useEmailAuthCredential";
import * as useGoogleAuthCredentialHooks from "../useGoogleAuthCredential";
import * as useDeleteAccountHooks from "../../../authentication/useDeleteAccount";

vi.mock("../../../../ui/ThreeDots", () => {
	return { default: () => <div>ThreeDots</div> };
});

const wrapper = ({ children }: { children: JSX.Element }) => <MemoryRouter>{queryWrapper({ children })}</MemoryRouter>;

describe("SettingsReauthenticateDelete", () => {
	const deleteAccountMock = vi.fn();

	test("render properly", () => {
		vi.spyOn(useEmailAuthCredentialHooks, "default").mockReturnValueOnce({ providerId: "123" } as EmailAuthCredential);
		vi.spyOn(useGoogleAuthCredentialHooks, "default").mockReturnValueOnce({ providerId: "123" } as OAuthCredential);
		render(<SettingsReauthenticateDelete />, { wrapper });

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button.textContent).toBe("Delete account");
	});

	test("render ErrorMessage if credentials doesnt exist", () => {
		render(<SettingsReauthenticateDelete />, { wrapper });

		expect(screen.queryByRole("button")).toBeNull();

		const error = screen.getByText("Please log in again.");
		expect(error).toBeInTheDocument();
	});

	test("calls deleteAccount onClick", async () => {
		vi.spyOn(useEmailAuthCredentialHooks, "default").mockReturnValueOnce({ providerId: "123" } as EmailAuthCredential);
		vi.spyOn(useGoogleAuthCredentialHooks, "default").mockReturnValueOnce({ providerId: "123" } as OAuthCredential);
		vi.spyOn(useDeleteAccountHooks, "default").mockReturnValueOnce({
			deleteAccount: deleteAccountMock,
			status: "idle",
		});

		render(<SettingsReauthenticateDelete />, { wrapper });

		const button = screen.getByRole("button");

		await userEvent.click(button);

		expect(deleteAccountMock).toBeCalled();
	});

	test("render ThreeDots while status is pending", () => {
		vi.spyOn(useEmailAuthCredentialHooks, "default").mockReturnValueOnce({ providerId: "123" } as EmailAuthCredential);
		vi.spyOn(useGoogleAuthCredentialHooks, "default").mockReturnValueOnce({ providerId: "123" } as OAuthCredential);
		vi.spyOn(useDeleteAccountHooks, "default").mockReturnValueOnce({
			deleteAccount: deleteAccountMock,
			status: "pending",
		});

		render(<SettingsReauthenticateDelete />, { wrapper });

		const threeDots = screen.getByText("ThreeDots");

		expect(threeDots).toBeInTheDocument();
	});
});
