import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast";

import { IOptionsDashboard, IPostDataProps, getDashboardPosts } from "../../services/firestore";

const useDashboard = () => {
	const [posts, setPosts] = useState<IPostDataProps[]>([]);
	const [latestDoc, setLatestDoc] = useState<QueryDocumentSnapshot | undefined>(undefined);
	const [end, setEnd] = useState<boolean>(false);

	const { mutate: getPosts, status } = useMutation({
		mutationFn: (options: IOptionsDashboard) => getDashboardPosts({ options, latestDoc }),

		onSuccess: ({ currentPosts, lastVisibleDoc }) => {
			if (!end) {
				if (currentPosts.length > 2) {
					setLatestDoc(lastVisibleDoc);
				} else {
					setEnd(true);
				}
				setPosts((prev) => [...prev, ...currentPosts]);
			}
		},

		onError: (err) => {
			console.error("DASHBOARD ERROR", err);
			toast.error("Something went wrong with dashboard posts fetching");
		},
	});

	return { posts, getPosts, status, end };
};

export default useDashboard;
