import { FormWindow } from "../../ui/FormWindow";
import FormManager from "./FormManager";
import { ISignProps } from "../../services/auth";
import useRegister from "./useRegister";

const RegisterForm = () => {
	const { register, status } = useRegister();

	const submitHandler = (data: ISignProps) => {
		if (!data) return;
		register(data);
	};

	return (
		<FormWindow>
			<FormManager
				submitHandler={submitHandler}
				name="Register"
				status={status}
			/>
		</FormWindow>
	);
};

export default RegisterForm;
