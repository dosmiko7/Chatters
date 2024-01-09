import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DownloadElement from "../DownloadElement";

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

describe("DownloadElement", () => {
	describe("render correctly", () => {
		test("with passed props", () => {
			render(
				<DownloadElement
					fileUrl="someFileUrl"
					filename="SomeFile.txt"
				/>,
				{ wrapper }
			);

			const wrapperElement = screen.getByRole("wrapper");
			const button = screen.getByRole("button");
			const paragraph = screen.getByRole("paragraph");

			expect(wrapperElement).toBeInTheDocument();
			expect(button).toBeInTheDocument();
			expect(button).not.toBeDisabled();
			expect(paragraph).toHaveTextContent("SomeFile.txt");
		});

		test("without filename prop", () => {
			render(<DownloadElement fileUrl="someFileUrl" />, { wrapper });

			const paragraph = screen.queryByRole("paragraph");

			expect(paragraph).toBeNull();
		});
	});

	test("button changes its disabled value when pressed", async () => {
		vi.spyOn(console, "error").mockImplementation(() => undefined);

		render(
			<DownloadElement
				fileUrl="someFileUrl"
				filename="SomeFile.txt"
			/>,
			{ wrapper }
		);

		const button = screen.getByRole("button");
		expect(button).not.toBeDisabled();

		await userEvent.click(button);
		await waitFor(() => expect(button).toBeDisabled());
		await waitFor(() => expect(button).not.toBeDisabled());
	});
});
