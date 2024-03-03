import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import DashboardFilterButton from "../DashboardFilterButton";

describe("DashboardFilterButton", () => {
	const testFunction = vi.fn();

	test("render properly", () => {
		render(
			<DashboardFilterButton
				icon={<div>Icon</div>}
				onClickHandler={testFunction}
				isActive={true}
				infoMsg="exampleMsg"
			/>
		);

		const button = screen.getByRole("button", { name: "Icon" });
		expect(button).toBeInTheDocument();
	});

	test("should have transparent border color if isActive is false", () => {
		render(
			<DashboardFilterButton
				icon={<div>Icon</div>}
				onClickHandler={testFunction}
				isActive={false}
				infoMsg="exampleMsg"
			/>
		);

		const button = screen.getByRole("button", { name: "Icon" });
		expect(button).toHaveStyle("border-color: transparent");
	});

	test("should not have transparent border color if isActive is true", () => {
		render(
			<DashboardFilterButton
				icon={<div>Icon</div>}
				onClickHandler={testFunction}
				isActive={true}
				infoMsg="exampleMsg"
			/>
		);

		const button = screen.getByRole("button", { name: "Icon" });
		expect(button).not.toHaveStyle("border-color: transparent");
	});

	test("should call passed function on click", async () => {
		render(
			<DashboardFilterButton
				icon={<div>Icon</div>}
				onClickHandler={testFunction}
				isActive={false}
				infoMsg="exampleMsg"
			/>
		);

		const button = screen.getByRole("button", { name: "Icon" });
		await userEvent.click(button);
		expect(testFunction).toBeCalled();
	});
});
