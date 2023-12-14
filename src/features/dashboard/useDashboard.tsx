import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";

import { IOptionsDashboard, IPostDataProps, getDashboardPosts } from "../../services/firestore";

const useDashboard = () => {
	const [posts, setPosts] = useState<IPostDataProps[]>([]);
	const [latestDoc, setLatestDoc] = useState<QueryDocumentSnapshot | undefined>(undefined);
	const [end, setEnd] = useState<boolean>(false);

	const { mutate: getPosts, status } = useMutation({
		mutationFn: (options: IOptionsDashboard) => getDashboardPosts({ options, latestDoc }),

		onSuccess: ({ currentPosts, lastVisibleDoc }) => {
			if (currentPosts.length > 2) {
				setLatestDoc(lastVisibleDoc);
				setPosts((prev) => [...prev, ...currentPosts]);
			} else {
				setPosts((prev) => [...prev, ...currentPosts]);
				setEnd(true);
			}
		},

		onError: (err) => {
			console.error("DASHBOARD ERROR ", err);
		},
	});

	return { posts, getPosts, status, end };
};

export default useDashboard;
