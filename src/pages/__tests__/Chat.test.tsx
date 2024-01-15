import { User } from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import * as useLoggedUserHooks from "../../features/authentication/useLoggedUser";
import Chat from "../Chat";

const useParamsExampleData = { combinedId: "test123" };

type UseLocationExampleData = {
	state: { someData: string } | null;
};

const useLocationExampleData: UseLocationExampleData = {
	state: { someData: "someTestData" },
};

const TestChatDetail = ({ state }: { state: any }) => {
	return <span>Received value: {state.someData}</span>;
};

vi.mock("../../features/chats/ChatDetail", () => {
	return {
		default: (props: any) => <TestChatDetail {...props} />,
	};
});

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useParams: () => useParamsExampleData,
		useLocation: () => useLocationExampleData,
	};
});

describe("Chat", () => {
	test("should render ChatDetail properly", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "test" } as User });

		render(<Chat />);

		const receivedValue = screen.getByText(/^Received/i);
		expect(receivedValue.textContent).toBe("Received value: someTestData");
	});

	test("should render Empty if chatId doesnt contain current user id", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "none" } as User });

		render(<Chat />);

		expect(screen.getByText("Access denied")).toBeInTheDocument();
	});

	test("should render Empty if location.state doesnt exist", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "test" } as User });
		useLocationExampleData.state = null;

		render(<Chat />);

		expect(screen.getByText("Please select chat from list")).toBeInTheDocument();

		useLocationExampleData.state = { someData: "someTestData" };
	});
});
