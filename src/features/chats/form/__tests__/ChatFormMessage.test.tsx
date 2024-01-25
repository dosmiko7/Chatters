import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useFilePreviewHooks from "../../../../hooks/useFilePreview";
import ChatFormMessage from "../ChatFormMessage";
import Wrapper from "./formWrapper";

const useWatchMock = vi.fn();
vi.mock("react-hook-form", async () => {
	const actual = await vi.importActual("react-hook-form");
	return {
		...actual,
		useWatch: () => useWatchMock(),
	};
});

describe("ChatFormMessage", () => {
	beforeEach(() => {
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValueOnce({ imgSrc: "testImg.jpg" });
	});

	test("render properly", () => {
		render(<ChatFormMessage status="idle" />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("placeholder", "Message...");
		expect(input).not.toBeDisabled();
	});

	test("should render additional content box if watcher exists", () => {
		useWatchMock.mockReturnValueOnce([{ name: "testFileName" }]);
		render(<ChatFormMessage status="idle" />, { wrapper: Wrapper });

		const fileAttachment = screen.getByLabelText("Attachment file");
		expect(fileAttachment).toBeInTheDocument();
		expect(within(fileAttachment).getByRole("button")).toBeInTheDocument();
		expect(within(fileAttachment).getByText("testFileName")).toBeInTheDocument();
		expect(within(fileAttachment).getByRole("img")).toHaveAttribute("src", "testImg.jpg");
	});

	test("button should be disabled if status is pending", () => {
		render(<ChatFormMessage status="pending" />, { wrapper: Wrapper });

		expect(screen.getByRole("textbox")).toBeDisabled();
	});
});
