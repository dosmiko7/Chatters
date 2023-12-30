import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { beforeAuthStateChanged, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

import useLoggedUser from "./useLoggedUser";
import { auth } from "../../firebase";
import { updateUserTimestamp } from "../../services/firestore/userApi";

const useOnAuthChange = () => {
	const queryClient = useQueryClient();
	const { loggedUser } = useLoggedUser();
	const navigate = useNavigate();

	useEffect(() => {
		const unsub = beforeAuthStateChanged(auth, async (user) => {
			if (user) {
				await updateUserTimestamp({ mode: "login", userId: user.uid });
			} else {
				await updateUserTimestamp({ mode: "logout", userId: loggedUser?.uid });
			}
		});
		return () => unsub();
	}, [loggedUser]);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (!user) {
				queryClient.removeQueries();
				navigate("/login");
				toast.error("Please, login again");
			}
		});
		return () => unsub();
	}, [queryClient, navigate]);
};

export default useOnAuthChange;
