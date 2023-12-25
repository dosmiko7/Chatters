import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/auth/authApi";

const useLoggedUser = () => {
	const { data } = useQuery({
		queryKey: ["loggedUser"],
		queryFn: getCurrentUser,
		gcTime: Infinity,
	});

	return { data };
};

export default useLoggedUser;
