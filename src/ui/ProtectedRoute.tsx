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
			navigate("/login", { replace: true });
			toast.error("Please log in to continue", { id: "login_again" });
		} else if (!loggedUser.emailVerified) {
			navigate("/login", { replace: true });
			toast.error("Please confirm your email address", { id: "confirm_email" });
		}
	}, [loggedUser, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
