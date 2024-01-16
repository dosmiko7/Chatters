import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import Searches from "../Searches";

vi.mock("../SearchesWindow", () => {
	return {
		default: () => <div>SearchesWindow</div>,
	};
});

describe("Searches", () => {
	const onClickHandlerMock = vi.fn();

	test("render Button on start", () => {
		render(<Searches onClickHandler={onClickHandlerMock} />);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("opens SearchesWindow component on button click", async () => {
		render(<Searches onClickHandler={onClickHandlerMock} />);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		await waitFor(() => expect(screen.getByText("SearchesWindow")).toBeInTheDocument());
	});
});
