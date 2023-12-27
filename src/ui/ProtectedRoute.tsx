import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

import Spinner from "./Spinner";
import useLoggedUser from "../context/useLoggedUser";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { loggedUser, isLoading } = useLoggedUser();

	useEffect(() => {
		if (!loggedUser) {
			navigate("/login");
			toast.error("Please log in to continue");
		} else if (!loggedUser.emailVerified) {
			navigate("/login");
			toast.error("Please confirm your email address");
		}
	}, [loggedUser, navigate]);

	if (isLoading) {
		<FullPage>
			<Spinner />
		</FullPage>;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
