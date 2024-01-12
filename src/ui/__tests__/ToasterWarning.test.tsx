import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Toaster, toast } from "react-hot-toast";

import ToasterWarning from "../ToasterWarning";

afterEach(() => {
	toast.remove();
});

describe("ToasterWarning", async () => {
	const confirmHandlerMock = vi.fn();

	test("render properly", async () => {
		render(<Toaster />);
		await act(() =>
			toast((t) => (
				<ToasterWarning
					t={t}
					confirmHandler={confirmHandlerMock}
					message="Test message"
				/>
			))
		);

		const paragraph = screen.getByText("Test message");
		const buttons = screen.getAllByRole("button");

		expect(paragraph).toBeInTheDocument();
		expect(buttons).toHaveLength(2);
	});

	test("no button close a toast", async () => {
		render(<Toaster />);
		await act(() =>
			toast((t) => (
				<ToasterWarning
					t={t}
					confirmHandler={confirmHandlerMock}
					message="Test message"
				/>
			))
		);

		const buttonNo = screen.getByRole("button", { name: /no/i });
		fireEvent.click(buttonNo);
		await waitFor(() => expect(buttonNo).not.toBeVisible());
	});

	test("yes button calls confirmHandler and close a toast", async () => {
		render(<Toaster />);
		await act(() =>
			toast((t) => (
				<ToasterWarning
					t={t}
					confirmHandler={confirmHandlerMock}
					message="Test message"
				/>
			))
		);

		const buttonYes = screen.getByRole("button", { name: /yes/i });
		fireEvent.click(buttonYes);
		expect(confirmHandlerMock).toBeCalled();
		await waitFor(() => expect(buttonYes).not.toBeVisible());
	});
});
