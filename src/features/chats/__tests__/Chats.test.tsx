import { screen, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Chats from "../Chats";

vi.mock("../../../ui/Empty", () => {
	return {
		default: () => <div data-testid="Empty"></div>,
	};
});

describe("Chats", () => {
	test("should return Empty component", () => {
		render(<Chats />);

		expect(screen.getByTestId("Empty")).toBeInTheDocument();
	});
});
