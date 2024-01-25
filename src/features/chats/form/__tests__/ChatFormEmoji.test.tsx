import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import ChatFormEmoji from "../ChatFormEmoji";
import Wrapper from "./formWrapper";

describe("ChatFormEmoji", () => {
	const onSubmitHandlerMock = vi.fn();

	test("render properly", () => {
		render(
			<ChatFormEmoji
				setEmoji="testEmoji"
				onSubmitHandler={onSubmitHandlerMock}
			/>,
			{ wrapper: Wrapper }
		);

		const emojiLabel = screen.getByLabelText("Send emoji");
		expect(emojiLabel).toBeVisible();
	});

	test("should call onSubmitHandler on label click", () => {
		render(
			<ChatFormEmoji
				setEmoji="testEmoji"
				onSubmitHandler={onSubmitHandlerMock}
			/>,
			{ wrapper: Wrapper }
		);

		const emojiLabel = screen.getByLabelText("Send emoji");
		fireEvent.click(emojiLabel);
		expect(onSubmitHandlerMock).toBeCalledWith({ message: "", file: null, gif: "", emoji: "testEmoji" });
	});
});
