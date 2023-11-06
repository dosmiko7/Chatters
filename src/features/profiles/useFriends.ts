import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IFriend, IUserData, getUser } from "../../services/firestore";
import getUsersID from "../../utils/getUsersID";

const useFriends = (friends: IFriend[]) => {
	const { userId } = useParams();
	const queryClient = useQueryClient();
	const usersId = getUsersID(friends);

	useQueries({
		queries: usersId.map((id) => {
			return {
				queryKey: ["user", id, userId],
				queryFn: () => getUser(id),
			};
		}),
	});

	const queryCache = queryClient.getQueryCache();
	const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

	const friendsQuries = queryKeys.filter((arr) => arr[0] === "user" && arr[arr.length - 1] === `${userId}`);

	const friendsData: (IUserData | undefined)[] = [];
	friendsQuries.forEach((query) => {
		friendsData.push(queryClient.getQueryData(query));
	});

	return friendsData;
};

export default useFriends;
