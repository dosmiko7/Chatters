import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ChatFormAdditional from "../ChatFormAdditional";

vi.mock("../ChatFormFile", () => {
	return {
		default: () => <div data-testid="ChatFormFile"></div>,
	};
});

vi.mock("../ChatFormGIF", () => {
	return {
		default: () => <div data-testid="ChatFormGIF"></div>,
	};
});

describe("ChatFormAdditional", () => {
	test("render properly", () => {
		render(<ChatFormAdditional />);

		expect(screen.getByTestId("ChatFormFile")).toBeInTheDocument();
		expect(screen.getByTestId("ChatFormGIF")).toBeInTheDocument();
	});
});
