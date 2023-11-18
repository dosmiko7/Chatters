import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFriends } from "../../services/firestore";

const useFriends = (friends: string[]) => {
	const { userId } = useParams();

	const { data: friendsData, status } = useQuery({
		queryKey: ["friends", userId],
		queryFn: () => getFriends(friends),
		retry: false,
	});

	return { friendsData, status };
};

export default useFriends;
