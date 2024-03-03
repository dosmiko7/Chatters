import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ProfileFormBackground from "../ProfileFormBackground";
import Wrapper from "../../../__tests__/formWrapper";
import * as useFilePreviewHooks from "../../../../../../hooks/useFilePreview";

const fileValid = new File(["valid"], "valid.png", { type: "image/png" });
const fileInvalidExtension = new File(["invalidExtension"], "invalidExtension.txt", { type: "text/plain" });

const fileTooBigSize = new File(["invalidSize"], "invalidSize.jpg", { type: "image/jpg" });
Object.defineProperty(fileTooBigSize, "size", { value: 1024 * 1024 + 6 });

describe("ProfileFormBackground", () => {
	test("render properly", () => {
		render(<ProfileFormBackground background="testBackground.jpg" />, { wrapper: Wrapper });

		expect(screen.getByRole("heading", { name: "Background" }));

		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "testBackground.jpg");

		const editLabel = screen.getByText("Edit");
		expect(editLabel).toBeInTheDocument();

		const hiddenInput = screen.getByPlaceholderText("Background");
		expect(hiddenInput).toBeInTheDocument();
		expect(hiddenInput).not.toBeVisible();
	});

	test("render error message if file has more than 1MB size", async () => {
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValue({ imgSrc: null });
		render(<ProfileFormBackground background="testBackground.jpg" />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("Background");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [fileTooBigSize] } }));

		await waitFor(() => expect(screen.getByText("File size should be less than 1 MB")).toBeInTheDocument());
	});

	test("render error message if file has invalid extension", async () => {
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValue({ imgSrc: null });
		render(<ProfileFormBackground background="testBackground.jpg" />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("Background");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [fileInvalidExtension] } }));

		await waitFor(() => expect(screen.getByText("Only jpg, jpeg, png are allowed")).toBeInTheDocument());
	});

	test("should not render error message if input is valid", async () => {
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValue({ imgSrc: null });
		render(<ProfileFormBackground background="testBackground.jpg" />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("Background");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [fileValid] } }));

		await waitFor(() => expect(screen.queryByText("Only jpg, jpeg, png are allowed")).not.toBeInTheDocument());
		await waitFor(() => expect(screen.queryByText("File size should be less than 1 MB")).not.toBeInTheDocument());
	});
});
