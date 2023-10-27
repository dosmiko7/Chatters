import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormWindow } from "../../ui/FormWindow";
import FormManager from "./FormManager";

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
	const handleSubmit = (data: any) => {
		console.log("Login Form:", data);
	};

	const handleReminder = () => {
		console.log("Remind password");
	};

	return (
		<FormWindow>
			<FormManager
				submitHandler={handleSubmit}
				name="Login"
			/>
			<Reminder onClick={handleReminder}>Forgot Username/Password</Reminder>
			<StyledLink to="/register">Create Your Account</StyledLink>
		</FormWindow>
	);
};

export default LoginForm;
