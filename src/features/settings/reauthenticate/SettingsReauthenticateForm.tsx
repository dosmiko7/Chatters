import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import Form from "../../../ui/Form";
import SettingsReauthenticateLogin from "./SettingsReauthenticateLogin";
import SettingsReauthenticatePassword from "./SettingsReauthenticatePassword";
import Button from "../../../ui/Button";

const StyledForm = styled(Form)`
	gap: 1rem;
`;

const SubmitButton = styled(Button)`
	justify-content: center;
`;

interface IReauthenticateValues {
	email: string;
	password: string;
}

const SettingsReauthenticateForm = () => {
	const methods = useForm<IReauthenticateValues>({
		mode: "all",
		defaultValues: { email: "Your email", password: "Password" },
	});
	const {
		formState: { errors },
		handleSubmit,
	} = methods;

	const onSubmit: SubmitHandler<IReauthenticateValues> = (input) => {
		console.log(input);
	};

	return (
		<FormProvider {...methods}>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<SettingsReauthenticateLogin errors={errors.email} />
				<SettingsReauthenticatePassword errors={errors.password} />
				<SubmitButton type="submit">Delete account</SubmitButton>
			</StyledForm>
		</FormProvider>
	);
};

export default SettingsReauthenticateForm;
