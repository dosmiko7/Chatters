import { ReactElement } from "react";
import { screen, render, fireEvent, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Modal, { ModalContext } from "../Modal";

type ModalContextType = {
	openName: string;
	close: () => void;
	open: React.Dispatch<React.SetStateAction<string>>;
};

const customRender = (ui: ReactElement, { providerProps, ...renderOptions }: { providerProps: ModalContextType }) => {
	return render(<ModalContext.Provider value={providerProps}>{ui}</ModalContext.Provider>, renderOptions);
};

describe("Modal", () => {
	const close = vi.fn();
	const open = vi.fn();

	const providerProps = {
		openName: "Test",
		close,
		open,
	};

	test("consumer receives values from provider", () => {
		customRender(
			<ModalContext.Consumer>
				{(value) => (
					<div>
						<span>Received: {value.openName}</span>
						<button
							data-testid="close"
							onClick={() => close()}
						></button>
						<button
							data-testid="open"
							onClick={() => open()}
						></button>
					</div>
				)}
			</ModalContext.Consumer>,
			{
				providerProps,
			}
		);
		const span = screen.getByText(/^Received:/);
		expect(span.textContent).toBe("Received: Test");

		const closeButton = screen.getByTestId("close");
		fireEvent.click(closeButton);
		expect(close).toBeCalled();

		const openButton = screen.getByTestId("open");
		fireEvent.click(openButton);
		expect(open).toBeCalled();
	});

	describe("Open", () => {
		test("adds onClick properly to cloned element", () => {
			customRender(
				<ModalContext.Consumer>
					{() => (
						<Modal.Open opens="test">
							<div>Test</div>
						</Modal.Open>
					)}
				</ModalContext.Consumer>,
				{
					providerProps,
				}
			);

			const div = screen.getByText("Test");
			fireEvent.click(div);
			expect(open).toBeCalledTimes(1);
		});
	});

	describe("Window", () => {
		test("returns null if name is different from openName", () => {
			customRender(
				<ModalContext.Consumer>
					{(value) => (
						<Modal.Window name="NOT">
							<div>Current open name: {value.openName}</div>
						</Modal.Window>
					)}
				</ModalContext.Consumer>,
				{
					providerProps,
				}
			);

			const div = screen.queryByText(/^Current/);

			expect(div).not.toBeInTheDocument();
		});

		test("returns element if name is equal to openName", () => {
			customRender(
				<ModalContext.Consumer>
					{(value) => (
						<Modal.Window name="Test">
							<div>Current open name: {value.openName}</div>
						</Modal.Window>
					)}
				</ModalContext.Consumer>,
				{
					providerProps,
				}
			);

			const div = screen.queryByText(/^Current/);

			expect(div).toBeInTheDocument();
			if (div) {
				expect(div.textContent).toBe("Current open name: Test");
			}
		});

		test("has the width and height passed to it", () => {
			customRender(
				<ModalContext.Consumer>
					{() => (
						<Modal.Window
							name="Test"
							width="40px"
							height="50px"
						>
							<div></div>
						</Modal.Window>
					)}
				</ModalContext.Consumer>,
				{
					providerProps,
				}
			);

			const modal = screen.getByRole("modal");
			const styles = window.getComputedStyle(modal);

			expect(styles.width).toBe("40px");
			expect(styles.height).toBe("50px");
		});
	});

	test("Modal works properly. Open opens the modal, close button inside modal closes the window", () => {
		render(
			<Modal>
				<Modal.Open opens="test">
					<div data-testid="open">Open</div>
				</Modal.Open>
				<Modal.Window name="test">
					<div>Window</div>
				</Modal.Window>
			</Modal>
		);
		const overlay = screen.queryByRole("overlay");
		expect(overlay).not.toBeInTheDocument();

		const modal = screen.queryByRole("modal");
		expect(modal).not.toBeInTheDocument();

		const open = screen.getByTestId("open");
		fireEvent.click(open);

		expect(screen.getByRole("overlay")).toBeInTheDocument();
		expect(screen.getByRole("modal")).toBeInTheDocument();

		const closeButton = within(screen.getByRole("modal")).getByLabelText("close button");
		fireEvent.click(closeButton);
		expect(screen.queryByRole("modal")).not.toBeInTheDocument();
	});
});
