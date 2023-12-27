import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

import useLoggedUser from "../features/authentication/useLoggedUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { data: userData, isLoading, isError } = useLoggedUser();

	useEffect(() => {
		if (!userData || isError) {
			navigate("/login");
		} else if (!userData.emailVerified) {
			navigate("/login");
			toast.error("Please confirm your email address");
		}
	}, [userData, navigate, isError]);

	if (isLoading) {
		<FullPage>
			<Spinner />
		</FullPage>;
	}

	if (userData?.emailVerified) return <>{children}</>;
};

export default ProtectedRoute;
