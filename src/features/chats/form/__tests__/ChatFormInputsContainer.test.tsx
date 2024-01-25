import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ChatFormInputsContainer from "../ChatFormInputsContainer";

const TestComponentA = () => <div>TestComponentA</div>;
const TestComponentB = () => <div>TestComponentB</div>;

describe("ChatFormInputsContainer", () => {
	test("render properly", () => {
		render(
			<ChatFormInputsContainer status="idle">
				<TestComponentA />
				<TestComponentB />
			</ChatFormInputsContainer>
		);

		expect(screen.getByText("TestComponentA")).toBeInTheDocument();
		expect(screen.getByText("TestComponentB")).toBeInTheDocument();
	});

	test("should render ThreeDots component if status is pending", () => {
		render(
			<ChatFormInputsContainer status="pending">
				<TestComponentA />
			</ChatFormInputsContainer>
		);

		expect(screen.getByLabelText("Three dots - loading animation")).toBeVisible();
	});
});
