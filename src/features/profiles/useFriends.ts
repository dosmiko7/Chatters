import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFriends } from "../../services/firestore";
import useProfile from "./useProfile";

const useFriends = () => {
	const { profileData } = useProfile();
	const { userId } = useParams();
	const friends = profileData?.data.friends_list;

	const { data: friendsData = [], status } = useQuery({
		queryKey: ["friends", userId],
		queryFn: () => getFriends(friends),
		retry: false,
	});

	return { friendsData, status };
};

export default useFriends;
