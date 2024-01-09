import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Social from "../Social";

describe("Social", () => {
	describe("render properly", () => {
		test("with passed props", () => {
			render(
				<Social
					network="github"
					style={{ height: 30, width: 40 }}
					label="GitHub"
					href="https://github.com"
				/>
			);

			const social = screen.getByRole("social");
			const link = screen.getByRole("link");

			expect(social).toBeInTheDocument();
			expect(social).toContainElement(link);
		});

		test("without passing a style, it should have its default size", () => {
			render(
				<Social
					network="github"
					label="GitHub"
					href="https://github.com"
				/>
			);

			const social = screen.getByRole("social");
			const link = screen.getByRole("link");

			expect(social).toBeInTheDocument();
			expect(link).toBeInTheDocument();

			const styles = window.getComputedStyle(link);

			expect(styles.width).toBe("40px");
			expect(styles.height).toBe("40px");
		});
	});

	test("should be a link that have href value to passed href value", () => {
		render(
			<Social
				network="github"
				label="GitHub"
				href="https://github.com"
			/>
		);

		const link = screen.getByRole("link");

		expect(link).toHaveAttribute("href", "https://github.com");
	});
});
