import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BiChat } from "react-icons/bi";

import Empty from "../Empty";

describe("Empty", () => {
	describe("render properly", () => {
		test("with passed props", () => {
			render(
				<Empty
					message="Test message"
					icon={<div>Icon element</div>}
				/>
			);

			const emptyElement = screen.getByRole("wrapper");
			const heading = screen.getByRole("heading");
			const iconContainer = screen.getByLabelText("icon container");

			expect(emptyElement).toBeInTheDocument();
			expect(heading).toHaveTextContent("Test message");
			expect(iconContainer).toContainHTML("<div>Icon element</div>");
		});

		test("with passed svg icon from react icons", () => {
			render(
				<Empty
					message="Test message"
					icon={<BiChat data-testid="icon" />}
				/>
			);

			const emptyElement = screen.getByRole("wrapper");
			const iconContainer = screen.getByLabelText("icon container");
			const icon = screen.getByTestId("icon");

			expect(emptyElement).toBeInTheDocument();
			expect(iconContainer).toContainElement(icon);
		});
	});
});
