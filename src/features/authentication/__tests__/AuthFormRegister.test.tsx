import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useRegisterHooks from "../useRegister";
import AuthFormRegister from "../AuthFormRegister";
import AuthFormLogin from "../AuthFormLogin";

vi.mock("../AuthFormManager", () => {
	return {
		default: (props: any) => (
			<div data-testid="AuthFormManager">
				<button onClick={() => props.submitHandler({ data: "testData" })}>SUBMIT</button>
			</div>
		),
	};
});

vi.mock("../AuthFormLogin", () => {
	return {
		default: () => <div>Login</div>,
	};
});

const setupMyTest = () => {
	const router = createMemoryRouter(
		[
			{
				path: "/register",
				element: <AuthFormRegister />,
			},
			{
				path: "/login",
				element: <AuthFormLogin />,
			},
		],
		{
			initialEntries: ["/register"],
			initialIndex: 0,
		}
	);

	render(<RouterProvider router={router} />);

	return { router };
};

describe("AuthFormRegister", () => {
	const registerMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(useRegisterHooks, "default").mockReturnValue({ register: registerMock, status: "idle" });
	});

	test("render properly", () => {
		render(
			<MemoryRouter initialEntries={["/register"]}>
				<AuthFormRegister />
			</MemoryRouter>
		);

		expect(screen.getByLabelText("Register form")).toBeInTheDocument();
		expect(screen.getByRole("link")).toBeInTheDocument();
	});

	test("should navigate to '/login' route on link click", async () => {
		const { router } = setupMyTest();

		expect(router.state.location.pathname).toEqual("/register");

		fireEvent.click(screen.getByRole("link"));

		await waitFor(() => {
			expect(router.state.location.pathname).toEqual("/login");
		});
	});

	test("should call register if data exists", () => {
		render(
			<MemoryRouter initialEntries={["/register"]}>
				<AuthFormRegister />
			</MemoryRouter>
		);

		const button = screen.getByRole("button", { name: "SUBMIT" });
		fireEvent.click(button);
		expect(registerMock).toBeCalledWith({ data: "testData" });
	});
});
