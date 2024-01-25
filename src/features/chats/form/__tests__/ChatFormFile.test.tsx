import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ChatFormFile from "../ChatFormFile";

vi.mock("../../../common/FileInput", () => {
	return {
		default: () => <div data-testid="FileInput"></div>,
	};
});

describe("ChatFormFile", () => {
	test("should return FileInput component", () => {
		render(<ChatFormFile />);

		expect(screen.getByTestId("FileInput")).toBeInTheDocument();
	});
});
