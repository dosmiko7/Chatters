import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import * as useIsVisibleHooks from "../../../hooks/useIsVisible";
import * as useDashboardHooks from "../useDashboard";
import { IPostDataProps } from "../../../services/firestore/dashboardApi";

import DashboardList from "../DashboardList";
import DashboardOptionsProvider from "../../../context/DashboardOptionsContext";

vi.mock("../../../hooks/useIsVisible");

vi.mock("../DashbaordListElement", () => {
	return {
		default: (props: any) => <div>{props.post.data.nickname}</div>,
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
	return (
		<QueryClientProvider client={queryClient}>
			<DashboardOptionsProvider>{children}</DashboardOptionsProvider>
		</QueryClientProvider>
	);
};

describe("DashboardList", () => {
	const fetchNextPageMock = vi.fn();
	const refetchMock = vi.fn();

	test("render List if posts exist", () => {
		const examplePosts = [
			{
				postId: "1",
				data: {
					nickname: "test1",
				},
			},
			{
				postId: "2",
				data: {
					nickname: "test2",
				},
			},
		] as IPostDataProps[];

		vi.spyOn(useDashboardHooks, "default").mockReturnValueOnce({
			posts: examplePosts,
			fetchNextPage: fetchNextPageMock,
			hasNextPage: false,
			status: "idle",
			refetch: refetchMock,
		});

		vi.spyOn(useIsVisibleHooks, "default").mockReturnValueOnce(false);

		render(<DashboardList />, { wrapper });

		expect(screen.getByText("test1")).toBeInTheDocument();
		expect(screen.getByText("test2")).toBeInTheDocument();
	});

	test("render paragraph with matching info if posts does not exist", () => {
		const examplePosts = [] as IPostDataProps[];

		vi.spyOn(useDashboardHooks, "default").mockReturnValueOnce({
			posts: examplePosts,
			fetchNextPage: fetchNextPageMock,
			hasNextPage: false,
			status: "idle",
			refetch: refetchMock,
		});

		vi.spyOn(useIsVisibleHooks, "default").mockReturnValueOnce(false);

		render(<DashboardList />, { wrapper });

		expect(screen.getByText("There are no posts yet")).toBeInTheDocument();
	});

	test("fetch next pages if bottom is visible, status is not fetching and posts exist", () => {
		const examplePosts = [
			{
				postId: "1",
				data: {
					nickname: "test1",
				},
			},
		] as IPostDataProps[];

		vi.spyOn(useDashboardHooks, "default").mockReturnValueOnce({
			posts: examplePosts,
			fetchNextPage: fetchNextPageMock,
			hasNextPage: true,
			status: "idle",
			refetch: refetchMock,
		});

		vi.spyOn(useIsVisibleHooks, "default").mockReturnValueOnce(true);

		render(<DashboardList />, { wrapper });

		expect(fetchNextPageMock).toBeCalled();
	});

	test("render Spinner if status is fetching", () => {
		const examplePosts = [
			{
				postId: "1",
				data: {
					nickname: "test1",
				},
			},
		] as IPostDataProps[];

		vi.spyOn(useDashboardHooks, "default").mockReturnValueOnce({
			posts: examplePosts,
			fetchNextPage: fetchNextPageMock,
			hasNextPage: true,
			status: "fetching",
			refetch: refetchMock,
		});

		vi.spyOn(useIsVisibleHooks, "default").mockReturnValueOnce(true);

		render(<DashboardList />, { wrapper });

		expect(screen.getByTestId("spinner")).toBeInTheDocument();
	});
});
