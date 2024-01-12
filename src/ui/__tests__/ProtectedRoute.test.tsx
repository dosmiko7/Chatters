import { screen, render, waitFor } from "@testing-library/react";
import { Mock, describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { MemoryRouter } from "react-router-dom";
import { User } from "firebase/auth";

import * as useLoggedUserHooks from "../../features/authentication/useLoggedUser";
import ProtectedRoute from "../ProtectedRoute";

vi.mock("../../features/authentication/useOnAuthChange", async (): Promise<unknown> => {
	return {
		default: () => ({ useOnAuthChange: vi.fn() }),
	};
});

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
		<QueryClientProvider client={queryClient}>
			<Toaster />
			{children}
		</QueryClientProvider>
	</MemoryRouter>
);

describe("ProtectedRoute", () => {
	test("render children elements properly", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: { emailVerified: true } as User });
		render(<ProtectedRoute>Children</ProtectedRoute>, { wrapper });

		const children = screen.getByText(/^Children/);

		expect(children).toBeInTheDocument();
	});

	test("shouldn't navigate anywhere if user exists and has verified email", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: { emailVerified: true } as User });
		render(<ProtectedRoute>Children</ProtectedRoute>, { wrapper });
		expect(useNavigateMock).toBeCalledTimes(0);
	});

	test('should navigate to /login if user is null with toast "Please log in to continue"', async () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: null });
		render(<ProtectedRoute>Children</ProtectedRoute>, { wrapper });

		expect(useNavigateMock).toBeCalledTimes(1);
		expect(useNavigateMock).toBeCalledWith("/login");
		await waitFor(() => {
			expect(screen.getByText("Please log in to continue")).toBeInTheDocument();
		});
	});

	test('should navigate to /login if user has not verified email with toast "Please confirm your email address"', async () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: { emailVerified: false } as User });
		render(<ProtectedRoute>Children</ProtectedRoute>, { wrapper });

		expect(useNavigateMock).toBeCalledTimes(1);
		expect(useNavigateMock).toBeCalledWith("/login");
		screen.debug();
		await waitFor(() => {
			expect(screen.getByText("Please confirm your email address")).toBeInTheDocument();
		});
	});
});
