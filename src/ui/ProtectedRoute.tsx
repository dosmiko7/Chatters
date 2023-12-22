import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

import useLoggedUser from "../features/authentication/useLoggedUser";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { data: userData } = useLoggedUser();

	useEffect(() => {
		if (!userData) navigate("/login");
	}, [userData, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
