import { useInfiniteQuery } from "@tanstack/react-query";
import { IOptionsDashboard, IPostDataProps, PAGINATION_LIMIT, getDashboardPosts } from "../../services/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";

interface IInitialProps {
	latestDoc: QueryDocumentSnapshot | undefined;
	pagination: number;
}

const initialPageParams: IInitialProps = {
	latestDoc: undefined,
	pagination: 1,
};

const options: IOptionsDashboard = {
	order: "desc",
};

// TODO: Change options to dynamic ones
const useDashboard = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		fetchStatus: status,
	} = useInfiniteQuery({
		queryKey: [],
		queryFn: ({ pageParam }) => getDashboardPosts({ options, ...pageParam }),
		initialPageParam: initialPageParams,
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

	return { posts, fetchNextPage, hasNextPage, status };
};

export default useDashboard;
