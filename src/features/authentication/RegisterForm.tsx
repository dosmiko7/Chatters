import { useNavigate } from "react-router-dom";
import { FormWindow } from "../../ui/FormWindow";
import FormManager from "./FormManager";

const RegisterForm = () => {
	const navigate = useNavigate();

	// TODO: Handling errors if register was not successful
	const submitHandler = (data: any) => {
		console.log("Register Form:", data);
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
