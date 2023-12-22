import useRegister from "./useRegister";
import { ISignProps } from "../../services/auth";
import { FormWindow } from "../../ui/FormWindow";
import AuthFormManager from "./AuthFormManager";

const AuthFormRegister = () => {
	const { register, status } = useRegister();

	const submitHandler = (data: ISignProps) => {
		if (!data) return;
		register(data);
	};

	return (
		<FormWindow>
			<AuthFormManager
				submitHandler={submitHandler}
				name="Register"
				statuses={[status]}
			/>
		</FormWindow>
	);
};

export default AuthFormRegister;
