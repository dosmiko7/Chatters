import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Mock, describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Logo from "../Logo";

const useNavigateMock: Mock = vi.fn();

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: (): Mock => useNavigateMock,
	};
});

describe("Logo", () => {
	test("render properly", () => {
		render(
			<MemoryRouter>
				<Logo />
			</MemoryRouter>
		);

		const logo = screen.getByRole("logo");

		expect(logo).toBeInTheDocument();
	});

	test("has correct image src", () => {
		render(
			<MemoryRouter>
				<Logo />
			</MemoryRouter>
		);

		const image = screen.getByRole("img");

		expect(image).toHaveAttribute("src", "logo.png");
	});

	test("when pressed, navigates to /dashboard", async () => {
		render(
			<MemoryRouter>
				<Logo />
			</MemoryRouter>
		);

		const image = screen.getByRole("img");
		await userEvent.click(image);

		expect(useNavigateMock).toHaveBeenCalledWith("/dashboard");
	});
});
