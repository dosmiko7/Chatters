import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import FileInput from "../FileInput";
import Wrapper from "./customWrapper";

const testFile = new File(["valid"], "valid.png", { type: "image/png" });
const fileTooBigSize = new File(["invalidSize"], "invalidSize.jpg", { type: "image/jpg" });
Object.defineProperty(fileTooBigSize, "size", { value: 1024 * 1024 + 6 });

describe("FileInput", () => {
	test("render properly", () => {
		render(<FileInput />, { wrapper: Wrapper });

		const wrapper = screen.getByRole("wrapper");
		expect(wrapper).toBeInTheDocument();
		expect(within(wrapper).getByPlaceholderText("File")).toBeInTheDocument();
	});

	test("render error message if file has more than 1MB size", async () => {
		render(<FileInput />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("File");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [fileTooBigSize] } }));

		await waitFor(() => expect(screen.getByText("File size should be less than 1 MB")).toBeInTheDocument());
	});

	test("render error message if file has invalid extension", async () => {
		render(<FileInput validExtensions={["txt"]} />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("File");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [testFile] } }));

		await waitFor(() => expect(screen.getByText("Only txt are allowed")).toBeInTheDocument());
	});

	test("should not render error message if input is valid", async () => {
		render(<FileInput validExtensions={["png"]} />, { wrapper: Wrapper });

		const hiddenInput = screen.getByPlaceholderText("File");
		await waitFor(() => fireEvent.change(hiddenInput, { target: { files: [testFile] } }));

		await waitFor(() => expect(screen.queryByText("Only png are allowed")).not.toBeInTheDocument());
	});
});
