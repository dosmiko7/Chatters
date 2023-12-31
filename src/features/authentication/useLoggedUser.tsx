import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";

export const useLoggedUser = () => {
	const queryClient = useQueryClient();

	let loggedUser: User | null | undefined = queryClient.getQueryData(["loggedUser"]);

	const loggedUserFromLocalStorage = localStorage.getItem("loggedUser");

	if (loggedUserFromLocalStorage && !loggedUser) {
		loggedUser = JSON.parse(loggedUserFromLocalStorage);
	}

	return { loggedUser };
};

export default useLoggedUser;
