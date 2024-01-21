import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import * as useFilePreviewHooks from "../../../../hooks/useFilePreview";
import DashboardFormAttachment from "../DashboardFormAttachment";
import Wrapper from "./formWrapper";

const useWatchMock = vi.fn();
const setValueMock = vi.fn();
vi.mock("react-hook-form", async () => {
	const actual = await vi.importActual("react-hook-form");
	return {
		...actual,
		useFormContext: () => ({
			setValue: setValueMock,
		}),
		useWatch: () => useWatchMock(),
	};
});

describe("DashboardFormAttachment", () => {
	test("should render AttachmentWithImage if image source exists", () => {
		useWatchMock.mockReturnValueOnce(null);
		useWatchMock.mockReturnValueOnce("");
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValueOnce({ imgSrc: "testImg.jpg" });
		render(<DashboardFormAttachment />);

		expect(screen.getByLabelText("Attachment with image")).toBeInTheDocument();
	});

	test("should render AttachmentWithoutImage if image source does not exist and fileWatcher has value", () => {
		useWatchMock.mockReturnValueOnce([{ name: "test" }]);
		useWatchMock.mockReturnValueOnce("");
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValueOnce({ imgSrc: "" });

		render(<DashboardFormAttachment />, { wrapper: Wrapper });
		expect(screen.getByLabelText("Attachment without image")).toBeInTheDocument();
	});

	test("should render NoAttachment if image source does not exist and fileWatcher has not value", () => {
		useWatchMock.mockReturnValueOnce(null);
		useWatchMock.mockReturnValueOnce("");
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValueOnce({ imgSrc: "" });

		render(<DashboardFormAttachment />, { wrapper: Wrapper });
		expect(screen.getByLabelText("No attachment")).toBeInTheDocument();
	});

	test("render button properly", () => {
		useWatchMock.mockReturnValueOnce(null);
		useWatchMock.mockReturnValueOnce("");
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValueOnce({ imgSrc: "" });

		render(<DashboardFormAttachment />, { wrapper: Wrapper });
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("should call setValue on button click", async () => {
		useWatchMock.mockReturnValueOnce(null);
		useWatchMock.mockReturnValueOnce("");
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValueOnce({ imgSrc: "" });

		render(<DashboardFormAttachment />, { wrapper: Wrapper });
		const button = screen.getByRole("button");
		await userEvent.click(button);

		await waitFor(() => expect(setValueMock).toBeCalled());
	});
});
