import { User } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import SettingsReauthenticateModal from "../SettingsReauthenticateModal";
import * as useLoggedUserHooks from "../../../authentication/useLoggedUser";

vi.mock("../SettingsReauthenticate", () => {
	return { default: () => <div>SettingsReauthenticate</div> };
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("SettingsReauthenticateModal", () => {
	test("render starting card properly", () => {
		render(<SettingsReauthenticateModal />, { wrapper });

		const wrapperEl = screen.getByRole("wrapper");
		expect(wrapperEl).toBeInTheDocument();

		const card = screen.getByLabelText("Card");
		expect(wrapperEl).toContainElement(card);
	});

	test("render SettingsReauthenticate component on open element click", async () => {
		render(<SettingsReauthenticateModal />, { wrapper });

		const wrapperEl = screen.getByRole("wrapper");
		await userEvent.click(wrapperEl);

		await waitFor(() => expect(screen.getByText("SettingsReauthenticate")).toBeInTheDocument());
	});

	test("return Info instead SettingsReauthenticate if current account is testing", async () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({
			loggedUser: { email: "cidot77582@vkr1.com" } as User,
		});

		render(<SettingsReauthenticateModal />, { wrapper });

		const wrapperEl = screen.getByRole("wrapper");
		await userEvent.click(wrapperEl);

		await waitFor(() => expect(screen.getByText("Delete option is disabled for test user")).toBeInTheDocument());
	});
});
