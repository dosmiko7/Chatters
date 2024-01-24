import { render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useChatCustomizationHooks from "../useChatCustomization";
import * as useModalHooks from "../../../../hooks/useModal";
import ChatMoreEmojiPicker from "../ChatMoreEmojiPicker";
import EmojiPicker from "emoji-picker-react";

vi.mock("emoji-picker-react");

describe("ChatMoreEmojiPicker", () => {
	const changeCustomizationMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(useChatCustomizationHooks, "default").mockReturnValue({
			changeCustomization: changeCustomizationMock,
			status: "idle",
		});
		vi.spyOn(useModalHooks, "default").mockReturnValue({ close: vi.fn(), openName: "test", open: vi.fn() });
	});

	test("should render EmojiPicker", () => {
		render(<ChatMoreEmojiPicker />);

		expect(EmojiPicker).toBeCalled();
	});
});
