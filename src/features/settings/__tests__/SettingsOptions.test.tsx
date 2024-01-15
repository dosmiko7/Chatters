import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SettingsOptions from "../SettingsOptions";

vi.mock("../SettingsOptionsDelete", () => {
	return { default: () => <div>Delete</div> };
});

vi.mock("../SettingsOptionsReset", () => {
	return { default: () => <div>Reset</div> };
});

vi.mock("../SettingsOptionsTheme", () => {
	return { default: () => <div>Theme</div> };
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

describe("SettingsOptions", () => {
	test("render properly", () => {
		render(<SettingsOptions />, { wrapper });

		const list = screen.getByRole("list");
		expect(list).toBeInTheDocument();

		expect(list.querySelectorAll("div")).toHaveLength(3);
	});
});
