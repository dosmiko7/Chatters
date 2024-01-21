import { FormProvider, useForm } from "react-hook-form";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import GIFInput from "../GIFInput";
import Wrapper from "./customWrapper";

vi.mock("../GIFContainer", () => {
	return {
		default: () => <div>GIFContainer</div>,
	};
});

const ClosingWindowTestWrapper = ({ children }: { children: JSX.Element }) => {
	const formMethods = useForm<{ gif: string }>({
		defaultValues: { gif: "" },
	});

	const { setValue } = formMethods;

	return (
		<FormProvider {...formMethods}>
			<span onClick={() => setValue("gif", "test")}>TESTSetGIF</span>
			<>{children}</>
		</FormProvider>
	);
};

describe("GIFInput", () => {
	test("should render only button on start", () => {
		render(<GIFInput isSubmit={true} />, { wrapper: Wrapper });

		expect(screen.queryByText("GIFContainer")).not.toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("GIFContainer should be in the document after button click", async () => {
		render(<GIFInput isSubmit={true} />, { wrapper: Wrapper });

		const button = screen.getByRole("button");

		expect(screen.queryByText("GIFContainer")).not.toBeInTheDocument();
		await userEvent.click(button);
		await waitFor(() => expect(screen.queryByText("GIFContainer")).toBeInTheDocument());
	});

	test("should close GIFContainer if watch has value", async () => {
		render(<GIFInput isSubmit={true} />, { wrapper: ClosingWindowTestWrapper });

		const button = screen.getByRole("button");
		const testGiFChanger = screen.getByText("TESTSetGIF");

		expect(screen.queryByText("GIFContainer")).not.toBeInTheDocument();
		await userEvent.click(button);
		await waitFor(() => expect(screen.queryByText("GIFContainer")).toBeInTheDocument());

		await userEvent.click(testGiFChanger);
		await waitFor(() => expect(screen.queryByText("GIFContainer")).not.toBeInTheDocument());
	});
});
