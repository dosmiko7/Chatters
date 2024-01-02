import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast";

import useLoggedUser from "../features/authentication/useLoggedUser";
import useOnAuthChange from "../features/authentication/useOnAuthChange";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { loggedUser } = useLoggedUser();
	useOnAuthChange();

	useEffect(() => {
		if (!loggedUser) {
			navigate("/login");
			toast.error("Please log in to continue");
		} else if (!loggedUser.emailVerified) {
			navigate("/login");
			toast.error("Please confirm your email address");
		}
	}, [loggedUser, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
