import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Profiles from "../Profiles";

vi.mock("../../../ui/Empty", () => {
	return {
		default: (props: any) => <div>{props.message}</div>,
	};
});

describe("Profiles", () => {
	test("render Empty component", () => {
		render(<Profiles />);

		expect(screen.getByText("No profile selected")).toBeInTheDocument();
	});
});
