import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DashboardFormGIF from "../DashboardFormGIF";

let useWatchTestValues: { file: string } | undefined = { file: "test" };

vi.mock("react-hook-form", () => {
	const actual = vi.importActual("react-hook-form");
	return {
		...actual,
		useWatch: () => useWatchTestValues,
	};
});

vi.mock("../../../common/GIFInput", () => {
	return {
		default: () => <div>GIFInput</div>,
	};
});

describe("DashboardFormGIF", () => {
	test("should return null if fileWatcher exists", () => {
		const { container } = render(<DashboardFormGIF />);

		expect(container).toBeEmptyDOMElement();
	});

	test("should render GIFInput if fileWatcher does not exist", () => {
		useWatchTestValues = undefined;
		render(<DashboardFormGIF />);

		expect(screen.getByText("GIFInput")).toBeInTheDocument();
	});
});
