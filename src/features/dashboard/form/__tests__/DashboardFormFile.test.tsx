import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DashboardFormFile from "../DashboardFormFile";

let useWatchTestValues: { file: string } | undefined = { file: "test" };

vi.mock("react-hook-form", () => {
	const actual = vi.importActual("react-hook-form");
	return {
		...actual,
		useWatch: () => useWatchTestValues,
	};
});

vi.mock("../../../common/FileInput", () => {
	return {
		default: () => <div>FileInput</div>,
	};
});

describe("DashboardFormFile", () => {
	test("should return null if gifWatcher exists", () => {
		const { container } = render(<DashboardFormFile />);

		expect(container).toBeEmptyDOMElement();
	});

	test("should render FileInput if gifWatcher does not exist", () => {
		useWatchTestValues = undefined;
		render(<DashboardFormFile />);

		expect(screen.getByText("FileInput")).toBeInTheDocument();
	});
});
