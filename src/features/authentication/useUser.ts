import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";

const useUser = () => {
	const queryClient = useQueryClient();
	const data: User | undefined = queryClient.getQueryData(["user"]);

	return { data };
};

export default useUser;
