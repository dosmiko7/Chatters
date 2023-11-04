import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/firestore";

const useProfile = () => {
	const { userId } = useParams();

	const { data: profileData, status } = useQuery({
		queryKey: ["profile", userId],
		queryFn: () => getUser(userId),
		retry: false,
	});

	return { profileData, status };
};

export default useProfile;
