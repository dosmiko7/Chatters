import styled from "styled-components";
import { ISignProps } from "../../services/auth";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { FormWindow } from "../../ui/FormWindow";
import FormManager from "./FormManager";
import { GoogleLogin } from "../../ui/GoogleLogin";
import { useLogin } from "./useLogin";

const StyledLink = styled(Link)`
	position: absolute;
	left: 50%;
	bottom: 5%;
	transform: translateX(-50%);
`;

const Reminder = styled.a`
	display: block;
	width: fit-content;
	margin: 5px auto;
`;

const LoginForm = () => {
	const { login, status } = useLogin();

	const handleLogin = (data: ISignProps) => {
		if (!data) return;
		login(data);
	};

	const handleReminder = () => {
		console.log("Remind password");
	};

	const handleGoogleLogin = () => {
		console.log("Google Login");
	};

	return (
		<FormWindow>
			<FormManager
				submitHandler={handleLogin}
				name="Login"
				status={status}
			/>
			<Reminder onClick={handleReminder}>Forgot Username/Password</Reminder>
			<GoogleLogin onClick={handleGoogleLogin}>
				<FcGoogle />
				Login with Google
			</GoogleLogin>
			<StyledLink to="/register">Create Your Account</StyledLink>
		</FormWindow>
	);
};

export default LoginForm;
