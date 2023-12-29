import { FieldError, useFormContext } from "react-hook-form";

import { emailValidation } from "../../../utils/validationTemplates";
import Input from "../../../ui/Input";
import FlexColumn from "../../../ui/FlexColumn";
import ErrorMessage from "../../../ui/ErrorMessage";

const SettingsReauthenticateLogin = ({ errors }: { errors: FieldError | undefined }) => {
	const { register } = useFormContext();

	return (
		<FlexColumn>
			<Input
				placeholder="Email"
				type="text"
				{...register("email", emailValidation)}
			/>
			{errors && <ErrorMessage>{errors?.message}</ErrorMessage>}
		</FlexColumn>
	);
};

export default SettingsReauthenticateLogin;
