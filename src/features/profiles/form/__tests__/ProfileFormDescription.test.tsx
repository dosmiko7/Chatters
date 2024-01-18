import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import ProfileFormDescription from "../ProfileFormDescription";
import Wrapper from "./formWrapper";

describe("ProfileFormDescription", () => {
	test("render properly", () => {
		render(<ProfileFormDescription />, { wrapper: Wrapper });

		expect(screen.getByRole("heading", { name: "Description" })).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	test("render matching error if input has more than 700 characters", async () => {
		const user = userEvent.setup({ delay: null });
		const invalidDscr800Chars =
			"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies";

		render(<ProfileFormDescription />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await user.type(input, invalidDscr800Chars);

		await waitFor(() => expect(screen.getByText("No more than 700 characters")).toBeInTheDocument());
	});

	test("should not render error if input is valid", async () => {
		const validDescription = "Valid example description";

		render(<ProfileFormDescription />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, validDescription);

		await waitFor(() => expect(screen.queryByLabelText("Error message")).not.toBeInTheDocument());
	});
});
