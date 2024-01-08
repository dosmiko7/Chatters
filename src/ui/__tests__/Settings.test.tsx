import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi, Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Settings from "../Settings";

const useNavigateMock: Mock = vi.fn();

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: (): Mock => useNavigateMock,
	};
});

describe("Settings", () => {
	test("button should have an icon inside", () => {
		render(
			<MemoryRouter>
				<Settings />
			</MemoryRouter>
		);

		const button = screen.getByRole("button");
		const icon = within(button).getByTestId("icon");

		expect(icon).toBeInTheDocument();
	});

	test('navigates to "/settings" when the button is clicked', async () => {
		render(
			<MemoryRouter>
				<Settings />
			</MemoryRouter>
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(useNavigateMock).toHaveBeenCalledWith("/settings");
	});
});
