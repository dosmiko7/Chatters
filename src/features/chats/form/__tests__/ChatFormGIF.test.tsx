import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ChatFormGIF from "../ChatFormGIF";

vi.mock("../../../common/GIFInput", () => {
	return {
		default: (props: any) => <div data-testid="GIFInput">{props.isSubmit.toString()}</div>,
	};
});

describe("ChatFormGIF", () => {
	test("should return GIFInput component", () => {
		render(<ChatFormGIF />);

		expect(screen.getByTestId("GIFInput").textContent).toBe("true");
	});
});
