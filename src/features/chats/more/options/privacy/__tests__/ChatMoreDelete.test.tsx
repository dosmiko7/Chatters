import { toast } from "react-hot-toast";
import { screen, render, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import ChatMoreDelete from "../ChatMoreDelete";
import * as useDeleteChatHooks from "../useDeleteChat";

vi.mock("react-hot-toast");

describe("ChatMoreDelete", () => {
	const deleteChatMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(useDeleteChatHooks, "default").mockReturnValueOnce({ deleteChat: deleteChatMock, status: "idle" });
	});

	test("render properly", () => {
		render(<ChatMoreDelete />);

		expect(screen.getByRole("button")).toHaveTextContent("Delete chat");
	});

	test("should call toast on button click", async () => {
		render(<ChatMoreDelete />);
		const button = screen.getByRole("button");

		fireEvent.click(button);
		expect(toast).toBeCalled();
	});
});
