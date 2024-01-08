import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import Card from "../Card";

describe("Card", () => {
	describe("render correctly", () => {
		test("with passed props", () => {
			render(
				<Card
					icon={<div aria-label="icon"></div>}
					heading="Heading"
					info="Info"
				/>
			);

			const card = screen.getByLabelText("Card");
			const icon = screen.getByLabelText("icon");
			const heading = screen.getByRole("heading");
			const paragraph = screen.getByText("Info");

			expect(card).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
			expect(heading).toHaveTextContent("Heading");
			expect(paragraph).toHaveTextContent("Info");
		});

		test("and passed function is called on click", async () => {
			const handleOnClick = vi.fn();

			render(
				<Card
					icon={<div aria-label="icon"></div>}
					heading="Heading"
					info="Info"
					onClickHandler={handleOnClick}
				/>
			);

			const card = screen.getByLabelText("Card");

			await userEvent.click(card);
			expect(handleOnClick).toBeCalledTimes(1);
		});
	});
});
