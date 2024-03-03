import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ProfilePersonals from "../ProfilePersonals";

describe("ProfilePersonals", () => {
	test("should render personals if they were provided by props", () => {
		render(
			<ProfilePersonals
				personals={{ name: "nameTest", surname: "surnameTest", birthday: "birthdayTest", city: "cityTest" }}
			/>
		);

		expect(screen.getByText("nameTest")).toBeInTheDocument();
		expect(screen.getByText("surnameTest")).toBeInTheDocument();
		expect(screen.getByText("birthdayTest")).toBeInTheDocument();
		expect(screen.getByText("cityTest")).toBeInTheDocument();
	});

	test("should render info if there are no personals", () => {
		render(<ProfilePersonals personals={{}} />);

		expect(screen.getByText("No personal details")).toBeInTheDocument();
	});
});
