import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/auth/authApi";

const useLoggedUser = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["loggedUser"],
		queryFn: getCurrentUser,
		gcTime: 10 * 60 * 1000,
	});

	return { data, isLoading, isError };
};

export default useLoggedUser;
