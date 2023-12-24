import { useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";

import { IPostDataProps, PAGINATION_LIMIT, getDashboardPosts } from "../../services/firestore/dashboardApi";
import { DashboardOptionsContext } from "../../context/DashboardOptions";

interface IInitialProps {
	latestDoc: QueryDocumentSnapshot | undefined;
	pagination: number;
}

const INITIAL_PAGE_PARAM: IInitialProps = {
	latestDoc: undefined,
	pagination: 1,
};

// TODO: Change options to dynamic ones
const useDashboard = () => {
	const { options } = useContext(DashboardOptionsContext);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		fetchStatus: status,
		refetch,
	} = useInfiniteQuery({
		queryKey: ["posts", options.order, options.key],
		queryFn: ({ pageParam }) => getDashboardPosts({ options, ...pageParam }),
		initialPageParam: INITIAL_PAGE_PARAM,
		getNextPageParam: ({ currentPosts, lastVisibleDoc, pagination }) => {
			if (currentPosts.length > PAGINATION_LIMIT - 1) {
				return { latestDoc: lastVisibleDoc, pagination: pagination + 1 };
			}
		},
	});

	let posts: IPostDataProps[] = [];
	if (data) {
		posts = data?.pages.reduce((acc: IPostDataProps[], pages) => {
			return [...acc, ...pages.currentPosts];
		}, []);
	}

	return { posts, fetchNextPage, hasNextPage, status, refetch };
};

export default useDashboard;
