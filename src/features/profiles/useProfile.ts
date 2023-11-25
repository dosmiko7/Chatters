import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/firestore";

interface IUseProfileProps {
	passedUserId?: string;
}

const useProfile = (props: IUseProfileProps = {}) => {
	const { passedUserId } = props;
	const { userId: paramsUserId } = useParams();
	const userId = passedUserId || paramsUserId;

	const { data: profileData, status } = useQuery({
		queryKey: ["profile", userId],
		queryFn: () => getUser(userId),
		retry: false,
	});

	return { profileData, status };
};

export default useProfile;
