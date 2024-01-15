import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { queryClient, wrapper } from "./testingQuery";
import useGoogleAuthCredential from "../useGoogleAuthCredential";

const TestComponent = () => {
	const googleAuthCredential = useGoogleAuthCredential();

	return <span>Received credentials: {googleAuthCredential?.providerId || "undefined"}</span>;
};

describe("useGoogleAuthCredential", () => {
	afterEach(() => {
		queryClient.clear();
	});

	test("returns credential from query properly", () => {
		queryClient.setQueryData(["googleAuthCredential"], { providerId: "test" });
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
