import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMoreModalEmoji from "../ChatMoreModalEmoji";

vi.mock("../ChatMoreEmojiPicker", () => {
	return {
		default: () => <div data-testid="ChatMoreEmojiPicker"></div>,
	};
});

describe("ChatMoreModalEmoji", () => {
	test("render properly", () => {
		render(<ChatMoreModalEmoji setEmoji="testEmoji" />);

		expect(screen.getByRole("button")).toHaveTextContent("testEmoji Emoji");
	});

	test("should open ChatMoreEmojiPicker on button click", async () => {
		render(<ChatMoreModalEmoji setEmoji="testEmoji" />);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		await waitFor(() => {
			expect(screen.getByRole("heading")).toHaveTextContent("Emoji");
			expect(screen.getByTestId("ChatMoreEmojiPicker"));
		});
	});
});
