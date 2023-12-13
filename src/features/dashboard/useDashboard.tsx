import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";

import { IOptionsDashboard, IPostDataProps, getDashboardPosts } from "../../services/firestore";

const useDashboard = () => {
	const [posts, setPosts] = useState<IPostDataProps[]>([]);
	const [latestDoc, setLatestDoc] = useState<QueryDocumentSnapshot | null>(null);

	const { mutate: getPosts, status } = useMutation({
		mutationFn: (options: IOptionsDashboard) => getDashboardPosts({ options, latestDoc }),

		onSuccess: ({ currentPosts, lastVisibleDoc }) => {
			setLatestDoc(lastVisibleDoc);
			setPosts((prev) => [...prev, ...currentPosts]);
		},

		onError: (err) => {
			console.error("DASHBOARD ERROR ", err);
		},
	});

	return { posts, getPosts, status };
};

export default useDashboard;
