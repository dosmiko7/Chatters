import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import SettingsDetail from "../SettingsDetail";

vi.mock("../SettingsOptions", () => {
	return {
		default: () => <ul>Options</ul>,
	};
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("SettingsDetail", () => {
	test("render properly", () => {
		render(<SettingsDetail />, { wrapper });

		const container = screen.getByRole("container");
		const heading = screen.getByRole("heading");
		const list = screen.getByRole("list");

		expect(container).toBeInTheDocument();
		expect(heading.textContent).toBe("Settings");
		expect(container).toContainElement(heading);
		expect(container).toContainElement(list);
	});
});
