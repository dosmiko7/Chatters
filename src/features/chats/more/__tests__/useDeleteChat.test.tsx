import { User } from "firebase/auth";
import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as chatsApiFunctions from "../../../../services/firestore/chatsApi";
import * as useLoggedUserHooks from "../../../authentication/useLoggedUser";
import useDeleteChat from "../useDeleteChat";
import wrapper from "./wrapper";

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

describe("useDeleteChat", () => {
	beforeEach(() => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValue({ loggedUser: { uid: "testLoggedUserId" } as User });
	});

	test("should return success status, call toast.succes and navigate to '/chats' if the promise was successfully resolved", async () => {
		vi.spyOn(chatsApiFunctions, "deleteChats").mockResolvedValueOnce();

		const { result } = renderHook(() => useDeleteChat(), { wrapper });

		act(() => result.current.deleteChat());

		await waitFor(() => expect(result.current.status).toBe("success"));
		expect(useNavigateMock).toBeCalledWith("/chat");
		expect(toast.success).toBeCalledWith("Chat deletion was successful");
	});

	test("should return error status, call console.error and toast.error if the promise was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(chatsApiFunctions, "deleteChats").mockRejectedValueOnce("error");

		const { result } = renderHook(() => useDeleteChat(), { wrapper });

		act(() => result.current.deleteChat());

		await waitFor(() => expect(result.current.status).toBe("error"));
		expect(toast.error).toBeCalledWith("Sorry. Something went wrong with chat removing.");
		expect(errorSpy).toBeCalled();
	});
});
