import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Mock, describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

import Logout from "../Logout";
import * as useSignOutHooks from "../../features/authentication/useSignOut";

const useNavigateMock: Mock = vi.fn();

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: (): Mock => useNavigateMock,
	};
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => (
	<MemoryRouter>
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</MemoryRouter>
);

describe("Logout", () => {
	test("render properly", () => {
		render(<Logout />, { wrapper });

		const logout = screen.getByRole("button");

		expect(logout).toBeInTheDocument();
	});

	test("button becomes disabled when status is pending", () => {
		const useSignOutSpy = vi.spyOn(useSignOutHooks, "default");

		useSignOutSpy.mockReturnValue({
			signOut: vi.fn(),
			status: "pending",
		});

		render(<Logout />, { wrapper });

		const logout = screen.getByRole("button");

		expect(logout).toBeDisabled();
	});

	test("navigates to /login when the button is clicked", async () => {
		render(<Logout />, { wrapper });

		const logout = screen.getByRole("button");
		await userEvent.click(logout);

		expect(useNavigateMock).toHaveBeenCalledWith("/login", { replace: true });
	});
});
