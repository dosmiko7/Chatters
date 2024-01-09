import { screen, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import List from "../List";

interface TestElement {
	data: number;
}

const TestData: TestElement[] = [{ data: 0 }, { data: 1 }];

describe("List", () => {
	describe("render properly", () => {
		test("with passed props", () => {
			render(
				<List<TestElement>
					data={TestData}
					style={{ color: "red" }}
					render={(item, index) => {
						return (
							<div
								key={index}
								role="listelement"
							>
								Index:{index} with data: {item.data}
							</div>
						);
					}}
				/>
			);

			const list = screen.getByRole("list");
			expect(list).toBeInTheDocument();

			const { getAllByRole } = within(list);
			const items = getAllByRole("listelement");
			expect(items.length).toBe(2);
		});

		test("apply style", () => {
			render(
				<List<TestElement>
					data={TestData}
					style={{ backgroundColor: "red" }}
					render={(item, index) => {
						return (
							<div
								key={index}
								role="listelement"
							>
								Index:{index} with data: {item.data}
							</div>
						);
					}}
				/>
			);

			const list = screen.getByRole("list");
			const style = window.getComputedStyle(list);

			expect(style.backgroundColor).toBe("red");
		});
	});
});
