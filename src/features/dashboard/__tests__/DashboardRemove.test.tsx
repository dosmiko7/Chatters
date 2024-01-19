import { User } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import { toast } from "react-hot-toast";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import DashboardRemove from "../DashboardRemove";
import * as useLoggedUserHooks from "../../authentication/useLoggedUser";
import * as useDeletePostHooks from "../useDeletePost";

/*
const MESSAGE = "Are you sure you want to delete this post?";

const DashboardRemove = ({ postCreatorId, postId }: { postCreatorId: string; postId: string }) => {
	const { deletePost, status } = useDeletePost();
	const { loggedUser } = useLoggedUser();
	if (postCreatorId !== loggedUser?.uid) return null;

	const onRemoveHandler = () => {
		toast(
			(t) => (
				<ToasterWarning
					t={t}
					confirmHandler={() => deletePost(postId)}
					message={MESSAGE}
				/>
			),
			toasterWarningOptions({ id: "deletePost" })
		);
	};

	return (
		<RemoveButton
			variant="danger"
			onClick={onRemoveHandler}
			disabled={status === "pending"}
		>
			<BiSolidTrash />
		</RemoveButton>
	);
};
*/
vi.mock("react-hot-toast");

vi.mock("react-icons/bi", () => {
	const actual = vi.importActual("react-icons/bi");
	return {
		...actual,
		BiSolidTrash: () => <div>BiSolidTrash</div>,
	};
});

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

describe("DashboardRemove", () => {
	const deletePostMock = vi.fn();

	test("render properly", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "testUser" } as User });
		vi.spyOn(useDeletePostHooks, "default").mockReturnValueOnce({ deletePost: deletePostMock, status: "idle" });

		render(
			<DashboardRemove
				postCreatorId="testUser"
				postId="testPostId"
			/>,
			{ wrapper }
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(within(button).getByText("BiSolidTrash")).toBeInTheDocument();
	});

	test("should return null if postCreatorId is not equal loggedUser.uid", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "testUserXYZ" } as User });
		vi.spyOn(useDeletePostHooks, "default").mockReturnValueOnce({ deletePost: deletePostMock, status: "idle" });

		const { container } = render(
			<DashboardRemove
				postCreatorId="testUser123"
				postId="testPostId"
			/>,
			{ wrapper }
		);

		expect(container).toBeEmptyDOMElement();
	});

	test("button is disabled if status is pending", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "testUser" } as User });
		vi.spyOn(useDeletePostHooks, "default").mockReturnValueOnce({ deletePost: deletePostMock, status: "pending" });

		render(
			<DashboardRemove
				postCreatorId="testUser"
				postId="testPostId"
			/>,
			{ wrapper }
		);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	test("should call toast with matching message on button click", async () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "testUser" } as User });
		vi.spyOn(useDeletePostHooks, "default").mockReturnValueOnce({ deletePost: deletePostMock, status: "idle" });

		render(
			<DashboardRemove
				postCreatorId="testUser"
				postId="testPostId"
			/>,
			{ wrapper }
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(toast).toBeCalled();
	});
});
