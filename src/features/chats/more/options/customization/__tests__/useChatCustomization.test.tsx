import { toast } from "react-hot-toast";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import * as chatsApiFunctions from "../../../../../../services/firestore/chatsApi";
import useChatCustomization from "../useChatCustomization";
import wrapper from "../../../__tests__/wrapper";

vi.mock("react-hot-toast");

const useParamsExampleData: { combinedId: string | undefined } = { combinedId: "testCombinedId" };

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useParams: () => useParamsExampleData,
	};
});

describe("useChatCustomization", () => {
	test("should return error status, call toast.error and console.error if the promise was rejected", async () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(chatsApiFunctions, "updateChatsCustomization").mockRejectedValueOnce("error");
		const { result } = renderHook(() => useChatCustomization(), { wrapper });

		act(() => result.current.changeCustomization({ emoji: "testEmoji", theme: "testEmoji" }));

		await waitFor(() => expect(result.current.status).toBe("idle"));
		await waitFor(() => expect(toast.error).toBeCalled());
		expect(errorSpy).toBeCalled();
	});
});
