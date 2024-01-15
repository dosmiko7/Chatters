import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import * as useMoveBackHooks from "../../hooks/useMoveBack";
import PageNotFound from "../PageNotFound";

describe("PageNotFound", () => {
	const useMoveBackMock = vi.fn();

	test("should render properly", () => {
		vi.spyOn(useMoveBackHooks, "default").mockReturnValueOnce(useMoveBackMock);
		render(<PageNotFound />);

		const heading = screen.getByRole("heading");
		expect(heading.textContent).toBe("The page you are looking for could not be found");

		const button = screen.getByRole("button");
		expect(button.textContent).toContain("Go back");
	});

	test("should call useMoveBack on button click", async () => {
		vi.spyOn(useMoveBackHooks, "default").mockReturnValueOnce(useMoveBackMock);
		render(<PageNotFound />);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		await waitFor(() => expect(useMoveBackMock).toBeCalled());
	});
});
