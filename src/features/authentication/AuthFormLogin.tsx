import styled from "styled-components";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import useLogin from "./useLogin";
import useGoogleLogin from "./useGoogleLogin";
import { ISignProps } from "../../services/auth/authApi";
import { ephasis } from "../../style/Templates";
import { FormWindow } from "../../ui/FormWindow";
import AuthFormManager from "./AuthFormManager";
import GoogleLogin from "../../ui/GoogleLogin";
import AuthPasswordReminderModal from "./AuthPasswordReminderModal";

const StyledLink = styled(Link)`
	${ephasis};
	position: absolute;
	left: 50%;
	bottom: 5%;
	transform: translateX(-50%);
`;

const AuthFormLogin = () => {
	const { login, status } = useLogin();
	const { login: googleLogin, status: googleStatus } = useGoogleLogin();

	const handleLogin = (data: ISignProps) => {
		if (!data) return;
		login(data);
	};

	const handleGoogleLogin = () => {
		googleLogin();
	};

	return (
		<FormWindow aria-label="Login form">
			<AuthFormManager
				submitHandler={handleLogin}
				name="Login"
				statuses={[status, googleStatus]}
			/>
			<AuthPasswordReminderModal />
			<GoogleLogin onClick={handleGoogleLogin}>
				<FcGoogle />
				Login with Google
			</GoogleLogin>
			<StyledLink to="/register">Create Your Account</StyledLink>
		</FormWindow>
	);
};

export default AuthFormLogin;
