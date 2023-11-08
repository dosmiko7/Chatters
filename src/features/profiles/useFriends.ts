import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IDocumentData, IFriend, getUser } from "../../services/firestore";
import { getUsersID } from "../../utils/getUsersID";
import { getQueryKeys, getSpecificQueriesData } from "../../utils/getQuery";

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

	const queryKeys = getQueryKeys(queryClient);

	const friendsQuries = queryKeys.filter((arr) => arr[0] === "user" && arr[arr.length - 1] === `${userId}`);
	const friendsData = getSpecificQueriesData<IDocumentData>(queryClient, friendsQuries);

	return friendsData;
};

export default useFriends;
