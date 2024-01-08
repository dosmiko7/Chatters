import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DownloadElement from "../DownloadElement";

const queryClient = new QueryClient();

describe("DownloadElement", () => {
	describe("render correctly", () => {
		test("with passed props", () => {
			render(
				<QueryClientProvider client={queryClient}>
					<DownloadElement
						fileUrl="someFileUrl"
						filename="SomeFile.txt"
					/>
				</QueryClientProvider>
			);

			const wrapper = screen.getByRole("wrapper");
			const button = screen.getByRole("button");
			const paragraph = screen.getByRole("paragraph");

			expect(wrapper).toBeInTheDocument();
			expect(button).toBeInTheDocument();
			expect(button).not.toBeDisabled();
			expect(paragraph).toHaveTextContent("SomeFile.txt");
		});

		test("without filename prop", () => {
			render(
				<QueryClientProvider client={queryClient}>
					<DownloadElement fileUrl="someFileUrl" />
				</QueryClientProvider>
			);

			const paragraph = screen.queryByRole("paragraph");

			expect(paragraph).toBeNull();
		});
	});

	test("button changes its disabled value when pressed", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<DownloadElement
					fileUrl="someFileUrl"
					filename="SomeFile.txt"
				/>
			</QueryClientProvider>
		);

		const button = screen.getByRole("button");

		expect(button).not.toBeDisabled();
		await userEvent.click(button);
		expect(button).toBeDisabled();

		await new Promise((r) => setTimeout(r, 2000));
		expect(button).not.toBeDisabled();
	});
});
