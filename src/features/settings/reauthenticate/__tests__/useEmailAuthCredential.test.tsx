import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import useEmailAuthCredential from "../useEmailAuthCredential";

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

const TestComponent = () => {
	const emailAuthCredential = useEmailAuthCredential();

	return <span>Received credentials: {emailAuthCredential?.providerId || "undefined"}</span>;
};

describe("useEmailAuthCredential", () => {
	afterEach(() => {
		queryClient.clear();
	});

	test("returns credential from query properly", () => {
		queryClient.setQueryData(["emailAuthCredential"], { providerId: "test" });
		render(<TestComponent />, { wrapper });

		const receivedValue = screen.getByText(/^Received/i);
		expect(receivedValue.textContent).toBe("Received credentials: test");
	});

	test("handle undefined credentials", () => {
		render(<TestComponent />, { wrapper });

		const receivedValue = screen.getByText(/^Received/i);
		expect(receivedValue.textContent).toBe("Received credentials: undefined");
	});
});
