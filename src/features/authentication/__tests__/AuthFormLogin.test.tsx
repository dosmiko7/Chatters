import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useLoginHooks from "../useLogin";
import * as useGoogleLoginHooks from "../useGoogleLogin";
import AuthFormLogin from "../AuthFormLogin";
import AuthFormRegister from "../AuthFormRegister";

vi.mock("../AuthFormManager", () => {
	return {
		default: (props: any) => (
			<div data-testid="AuthFormManager">
				<button onClick={() => props.submitHandler({ data: "testData" })}>SUBMIT</button>
			</div>
		),
	};
});

vi.mock("../AuthFormRegister", () => {
	return {
		default: () => <div>Register</div>,
	};
});

vi.mock("../AuthPasswordReminderModal", () => {
	return {
		default: () => <div data-testid="AuthPasswordReminderModal"></div>,
	};
});

const setupMyTest = () => {
	const router = createMemoryRouter(
		[
			{
				path: "/login",
				element: <AuthFormLogin />,
			},
			{
				path: "/register",
				element: <AuthFormRegister />,
			},
		],
		{
			initialEntries: ["/login"],
			initialIndex: 0,
		}
	);

	render(<RouterProvider router={router} />);

	return { router };
};

describe("AuthFormLogin", () => {
	const loginMock = vi.fn();
	const googleLoginMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(useLoginHooks, "default").mockReturnValue({ login: loginMock, status: "idle" });
		vi.spyOn(useGoogleLoginHooks, "default").mockReturnValue({ login: googleLoginMock, status: "idle" });
	});

	test("render properly", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<AuthFormLogin />
			</MemoryRouter>
		);

		expect(screen.getByLabelText("Login form")).toBeInTheDocument();
		expect(screen.getByText("Login with Google")).toBeInTheDocument();
		expect(screen.getByRole("link")).toBeInTheDocument();
	});

	test("should navigate to '/register' route on link click", async () => {
		const { router } = setupMyTest();

		expect(router.state.location.pathname).toEqual("/login");

		fireEvent.click(screen.getByRole("link"));

		await waitFor(() => {
			expect(router.state.location.pathname).toEqual("/register");
		});
	});

	test("should call login if data exists", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<AuthFormLogin />
			</MemoryRouter>
		);

		const button = screen.getByRole("button", { name: "SUBMIT" });
		fireEvent.click(button);
		expect(loginMock).toBeCalledWith({ data: "testData" });
	});

	test("should call useGoogleLogin on googleLogin button click", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<AuthFormLogin />
			</MemoryRouter>
		);

		const googleButton = screen.getByText("Login with Google");
		fireEvent.click(googleButton);
		expect(googleLoginMock).toBeCalled();
	});
});
