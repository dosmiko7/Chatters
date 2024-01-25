import { User } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as chatsApiFunctions from "../../../../services/firestore/chatsApi";
import * as useLoggedUserHooks from "../../../authentication/useLoggedUser";
import useSendMessage from "../useSendMessage";

vi.mock("react-hot-toast");

const useParamsExampleData: { combinedId: string | undefined } = { combinedId: "testCombinedId" };
const useNavigateMock = vi.fn();
vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
		useParams: () => useParamsExampleData,
	};
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("useSendMessage", () => {
	beforeEach(() => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: { uid: "testLoggedUserId" } as User });
	});

	test("should return error status, call console.error and toast.error if the promise was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(chatsApiFunctions, "updateChatsMessages").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useSendMessage(), { wrapper });

		try {
			await result.current.sendMessage("testInput");
		} catch (e) {
			expect(e).toMatch("error");
		}

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Sorry. Something went wrong.");
		expect(errorSpy).toBeCalled();
	});
});
