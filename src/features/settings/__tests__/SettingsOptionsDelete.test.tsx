import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import SettingsOptionsDelete from "../SettingsOptionsDelete";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => (
	<MemoryRouter>
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</MemoryRouter>
);

describe("SettingsOptionsDelete", () => {
	test("should render card", async () => {
		render(<SettingsOptionsDelete />, { wrapper });

		const card = screen.getByLabelText("Card");
		expect(card).toBeInTheDocument();

		const wrapperElement = screen.getByRole("wrapper");
		expect(wrapperElement).toContainElement(card);
	});
});
