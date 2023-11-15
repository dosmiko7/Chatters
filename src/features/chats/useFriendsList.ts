import { useQuery } from "@tanstack/react-query";
import { getFriendsList } from "../../services/firestore";
//import useLoggedUser from "../authentication/useLoggedUser";

// TODO: Change for dynamic logged user's data
const useFriendsList = () => {
	//const { data } = useLoggedUser();
	//const userID = data?.uid;
	const userID = "ivKwYDsLxLkM34cMKDdw";

	const { data: friendsList = [], status } = useQuery({
		queryKey: ["friendsList", userID],
		queryFn: () => getFriendsList(userID),
		retry: false,
	});

	return { friendsList, status };
};

export default useFriendsList;
