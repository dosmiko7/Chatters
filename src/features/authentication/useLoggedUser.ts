import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";

const useLoggedUser = () => {
	const queryClient = useQueryClient();
	const data: User | undefined = queryClient.getQueryData(["loggedUser"]);

	return { data };
};

export default useLoggedUser;
