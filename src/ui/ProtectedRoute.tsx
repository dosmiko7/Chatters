import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import useUser from "../features/authentication/useUser";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { data: userData } = useUser();

	useEffect(() => {
		if (!userData) navigate("/login");
	}, [userData, navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
