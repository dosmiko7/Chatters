import { useNavigate } from "react-router-dom";
import { FormWindow } from "../../ui/FormWindow";
import FormManager from "./FormManager";
import { ISignProps, signUp } from "../../services/auth";

const RegisterForm = () => {
	const navigate = useNavigate();

	// TODO: Handling errors if register was not successful
	const submitHandler = (data: ISignProps) => {
		console.log("Register Form:", data);
		signUp(data);
		navigate("/login");
	};

	return (
		<FormWindow>
			<FormManager
				submitHandler={submitHandler}
				name="Register"
			/>
		</FormWindow>
	);
};

export default RegisterForm;
