import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import useLoggedUser from "./useLoggedUser";
import { auth } from "../../firebase";
import { updateUserTimestamp } from "../../services/firestore/userApi";

const useOnAuthChange = () => {
	const queryClient = useQueryClient();
	const { loggedUser } = useLoggedUser();
	const navigate = useNavigate();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				await updateUserTimestamp({ mode: "logout", userId: loggedUser?.uid });
				queryClient.removeQueries();
				navigate("/login");
			} else {
				await updateUserTimestamp({ mode: "login", userId: user.uid });
			}
		});
		return () => unsub();
	}, [loggedUser, queryClient, navigate]);
};

export default useOnAuthChange;
