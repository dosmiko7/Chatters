import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/auth/authApi";

const useLoggedUser = () => {
	const { data: loggedUser, isLoading, isError } = useQuery({
		queryKey: ["loggedUser"],
		queryFn: getCurrentUser,
		gcTime: 10 * 60 * 1000,
	});

	return { loggedUser, isLoading, isError };
};

export default useLoggedUser;
