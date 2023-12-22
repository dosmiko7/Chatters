import styled from "styled-components";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { ISignProps } from "../../services/auth";
import useGoogleLogin from "./useGoogleLogin";
import { FormWindow } from "../../ui/FormWindow";
import AuthFormManager from "./AuthFormManager";
import { GoogleLogin } from "../../ui/GoogleLogin";
import { useLogin } from "./useLogin";
import AuthPasswordReminderModal from "./AuthPasswordReminderModal";

const StyledLink = styled(Link)`
	position: absolute;
	left: 50%;
	bottom: 5%;
	transform: translateX(-50%);
`;

// TODO: Reminder
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
		<FormWindow>
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
