import styled from "styled-components";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FormWindow } from "../../ui/FormWindow";
import FormManager from "./FormManager";
import { GoogleLogin } from "../../ui/GoogleLogin";
import { signIn } from "../../services/auth";

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
	const handleLogin = (data: { email: string; password: string }) => {
		console.log("Login Form:", data);
		signIn(data);
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
