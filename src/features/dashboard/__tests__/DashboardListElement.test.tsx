import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { IPostDataProps } from "../../../services/firestore/dashboardApi";
import DashboardListElement from "../DashboardListElement";

vi.mock("../../../ui/Avatar", () => {
	return {
		default: () => <div>Avatar</div>,
	};
});

vi.mock("../DashboardListAttachment", () => {
	return {
		default: () => <div>DashboardListAttachment</div>,
	};
});

vi.mock("../DashboardRemove", () => {
	return {
		default: () => <div>DashboardRemove</div>,
	};
});

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => vi.fn(),
	};
});

/*
const DashboardListElement = ({ post }: { post: IPostDataProps }) => {
	const navigate = useNavigate();
	const { userId, avatar, nickname, message, file, type, createdAt } = post.data;

	return (
		<Post>
			<Header>
				<Avatar
					size="4rem"
					src={avatar}
					onClick={() => navigate(`/profile/${userId}`)}
					square
				/>
				<Nickname>{nickname}</Nickname>
				<Date>{createdAt}</Date>
			</Header>
			<Paragraph>{message}</Paragraph>
			{file && (
				<DashboardListAttachment
					type={type}
					file={file}
				/>
			)}
			<DashboardRemove
				postCreatorId={userId}
				postId={post.postId}
			/>
		</Post>
	);
};
*/

describe("DashboardListElement", () => {
	const examplePost = {
		postId: "testPostId",
		data: {
			userId: "testUserId",
			avatar: "testAvatar.png",
			nickname: "testNickname",
			message: "testMessage",
			type: "image/png",
			createdAt: "testCreatedAt",
		},
	} as IPostDataProps;

	test("render properly", () => {
		render(<DashboardListElement post={examplePost} />);

		expect(screen.getByRole("article")).toBeInTheDocument();
		expect(screen.getByText("Avatar")).toBeInTheDocument();
		expect(screen.getByText("testNickname")).toBeInTheDocument();
		expect(screen.getByText("testCreatedAt")).toBeInTheDocument();
		expect(screen.getByRole("paragraph").textContent).toBe("testMessage");
		expect(screen.queryByText("DashboardListAttachment")).not.toBeInTheDocument();
		expect(screen.getByText("DashboardRemove")).toBeInTheDocument();
	});

	test("should render DashboardListAttachment if file exists", () => {
		examplePost.data["file"] = "testFile";

		render(<DashboardListElement post={examplePost} />);

		expect(screen.queryByText("DashboardListAttachment")).toBeInTheDocument();
	});
});
