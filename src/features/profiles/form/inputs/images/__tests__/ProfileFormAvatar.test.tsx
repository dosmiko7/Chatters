import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ProfileFormAvatar from "../ProfileFormAvatar";
import Wrapper from "../../../__tests__/formWrapper";
import * as useFilePreviewHooks from "../../../../../../hooks/useFilePreview";

const fileValid = new File(["valid"], "valid.png", { type: "image/png" });
const fileInvalidExtension = new File(["invalidExtension"], "invalidExtension.txt", { type: "text/plain" });

const fileTooBigSize = new File(["invalidSize"], "invalidSize.jpg", { type: "image/jpg" });
Object.defineProperty(fileTooBigSize, "size", { value: 1024 * 1024 + 6 });

describe("ProfileFormAvatar", () => {
	test("render properly", () => {
		render(<ProfileFormAvatar avatar="testAvatar.jpg" />, { wrapper: Wrapper });

		expect(screen.getByRole("heading", { name: "Avatar" }));

		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "testAvatar.jpg");

		const editLabel = screen.getByText("Edit");
		expect(editLabel).toBeInTheDocument();

		const hiddenInput = screen.getByPlaceholderText("Avatar");
		expect(hiddenInput).toBeInTheDocument();
		expect(hiddenInput).not.toBeVisible();
	});

	test("render error message if file has more than 1MB size", async () => {
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValue({ imgSrc: null });
		render(<ProfileFormAvatar avatar="testAvatar.jpg" />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("Avatar");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [fileTooBigSize] } }));

		await waitFor(() => expect(screen.getByText("File size should be less than 1 MB")).toBeInTheDocument());
	});

	test("render error message if file has invalid extension", async () => {
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValue({ imgSrc: null });
		render(<ProfileFormAvatar avatar="testAvatar.jpg" />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("Avatar");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [fileInvalidExtension] } }));

		await waitFor(() => expect(screen.getByText("Only jpg, jpeg, png are allowed")).toBeInTheDocument());
	});

	test("should not render error message if input is valid", async () => {
		vi.spyOn(useFilePreviewHooks, "default").mockReturnValue({ imgSrc: null });
		render(<ProfileFormAvatar avatar="testAvatar.jpg" />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("Avatar");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [fileValid] } }));

		await waitFor(() => expect(screen.queryByText("Only jpg, jpeg, png are allowed")).not.toBeInTheDocument());
		await waitFor(() => expect(screen.queryByText("File size should be less than 1 MB")).not.toBeInTheDocument());
	});
});
