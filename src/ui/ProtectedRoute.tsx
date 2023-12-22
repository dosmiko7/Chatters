import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

import useLoggedUser from "../features/authentication/useLoggedUser";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { data: userData } = useLoggedUser();

	useEffect(() => {
		if (!userData) {
			navigate("/login");
		} else if (!userData.emailVerified) {
			navigate("/login");
			toast.error("Please confirm your email address");
		}
	}, [userData, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
