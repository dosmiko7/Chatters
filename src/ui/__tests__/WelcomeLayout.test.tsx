import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import WelcomeLayout from "../WelcomeLayout";

vi.mock("../WelcomeBanner", () => {
	return {
		default: () => <div data-testid="WelcomeBanner"></div>,
	};
});

vi.mock("../Footer", () => {
	return {
		default: () => <div data-testid="Footer"></div>,
	};
});

const TestComponent = () => {
	return <div data-testid="TestComponent"></div>;
};

describe("WelcomeLayout", () => {
	test("render properly", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route element={<WelcomeLayout />}>
						<Route
							path="/"
							element={<TestComponent />}
						/>
					</Route>
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId("WelcomeBanner")).toBeInTheDocument();
		expect(screen.getByTestId("Footer")).toBeInTheDocument();
		expect(screen.getByTestId("TestComponent")).toBeInTheDocument();
	});
});
