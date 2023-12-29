import { FieldError, useFormContext } from "react-hook-form";

import { passwordLoginValidation } from "../../../utils/validationTemplates";
import Input from "../../../ui/Input";
import FlexColumn from "../../../ui/FlexColumn";
import ErrorMessage from "../../../ui/ErrorMessage";

const SettingsReauthenticatePassword = ({ errors }: { errors: FieldError | undefined }) => {
	const { register } = useFormContext();

	return (
		<FlexColumn>
			<Input
				placeholder="Password"
				type="password"
				{...register("password", passwordLoginValidation)}
			/>
			{errors && <ErrorMessage>{errors?.message}</ErrorMessage>}
		</FlexColumn>
	);
};

export default SettingsReauthenticatePassword;
