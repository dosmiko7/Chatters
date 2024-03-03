import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IDocumentData } from "../../../../services/firestore/userApi";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ProfileInformation from "../ProfileInformation";

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

describe("ProfileInformation", () => {
	const testData = {
		data: {
			avatar: "testAvatar.jpg",
			background: "testBackground.jpg",
			nickname: "testNickname",
			email: "test@email.com",
			description: "testDescription",
			personals: {},
			socials: {},
		},
	} as IDocumentData;

	test("render properly", () => {
		render(<ProfileInformation profileData={testData} />, { wrapper });

		const avatar = screen.getByRole("img");
		expect(avatar).toHaveAttribute("src", "testAvatar.jpg");

		const nickname = screen.getByRole("heading", { name: "testNickname" });
		expect(nickname).toBeInTheDocument();
		const email = screen.getByRole("heading", { name: "test@email.com" });
		expect(email).toBeInTheDocument();

		const description = screen.getByRole("paragraph");
		expect(description.textContent).toBe("testDescription");
	});
});
