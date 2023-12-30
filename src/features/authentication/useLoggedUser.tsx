import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";

export const useLoggedUser = () => {
	const queryClient = useQueryClient();

	const loggedUser: User | null | undefined = queryClient.getQueryData(["loggedUser"]);

	return { loggedUser };
};

export default useLoggedUser;
