import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import Avatar from "../Avatar";

describe("Avatar", () => {
	describe("render correctly", () => {
		test("with default src", () => {
			const defaultUrl = "avatar-default.png";

			render(<Avatar size="40px" />);

			const image = screen.getByAltText("Avatar") as HTMLImageElement;

			expect(image).toBeInTheDocument();
			expect(image.src).toBe(defaultUrl);
		});

		test("with provided src", () => {
			const imageUrl = "testImage.jpg";
			const defaultUrl = "avatar-default.png";

			render(
				<Avatar
					size="40px"
					src={imageUrl}
				/>
			);

			const image = screen.getByAltText("Avatar") as HTMLImageElement;

			expect(image).toBeInTheDocument();
			expect(image.src).not.toBe(defaultUrl);
			expect(image.src).toBe(imageUrl);
		});

		test("and applies styles based on props", () => {
			render(
				<Avatar
					size="40px"
					square
					border
					onClick={() => {}}
				/>
			);

			const avatarContainer = screen.getByLabelText("Avatar container");
			const styles = window.getComputedStyle(avatarContainer);

			expect(styles.width).toBe("40px");
			expect(styles.height).toBe("40px");
			expect(styles.borderRadius).toBe("0px");
		});

		test("and passed function is called on click", async () => {
			const handleOnClick = vi.fn();

			render(
				<Avatar
					size="40px"
					onClick={handleOnClick}
				/>
			);

			const avatarContainer = screen.getByLabelText("Avatar container");

			await userEvent.click(avatarContainer);
			expect(handleOnClick).toBeCalledTimes(1);
		});

		test("with wrong size passed", () => {
			render(<Avatar size="asdasd" />);

			const avatarContainer = screen.getByLabelText("Avatar container");
			const image = screen.getByAltText("Avatar") as HTMLImageElement;

			const styles = window.getComputedStyle(avatarContainer);

			expect(avatarContainer).toBeInTheDocument();
			expect(styles.width.length).toBe(0);
			expect(styles.height.length).toBe(0);

			expect(image).toBeInTheDocument();
		});
	});
});
