import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import { Form } from "../../ui/Form";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { flexRow } from "../../style/Templates";
import { ErrorMessage } from "../../ui/ErrorMessage";

const ReminderForm = styled(Form)`
	gap: 1rem;
	align-items: center;
`;

interface IReminderInputProps {
	isError: boolean;
}

const ReminderInput = styled(Input)<IReminderInputProps>`
	background-color: var(--color-primary-300);
	border: 1px solid ${(props) => (props.isError ? "var(--color-red-100)" : "transparent")};

	&:hover {
		background-color: transparent;
	}
`;

const SubmitButton = styled(Button)`
	${flexRow};
	justify-content: center;
	width: 50%;
`;

const emailValidation = {
	required: "Email is required",
	pattern: {
		value: /^\S+@\S+\.\S+$/,
		message: "Invalid email address",
	},
};

interface IReminderPassword {
	email: string;
}

const AuthPasswordReminder = () => {
	const methods = useForm<IReminderPassword>({ defaultValues: { email: "" }, mode: "onBlur" });
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = methods;

	const onSubmit: SubmitHandler<IReminderPassword> = async (input: IReminderPassword) => {
		console.log(input);
		reset();
	};

	return (
		<ReminderForm onSubmit={handleSubmit(onSubmit)}>
			<ReminderInput
				isError={errors.email ? true : false}
				type="text"
				placeholder="Email"
				{...register("email", emailValidation)}
			/>
			{errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
			<SubmitButton
				type="submit"
				size="small"
			>
				<p>Send email</p>
			</SubmitButton>
		</ReminderForm>
	);
};

export default AuthPasswordReminder;
