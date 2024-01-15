import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { queryClient, wrapper } from "./testingQuery";
import useEmailAuthCredential from "../useEmailAuthCredential";

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
