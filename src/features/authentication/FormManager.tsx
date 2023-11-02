import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import FormField from "./FormField";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledForm = styled(Form)`
	position: relative;
	gap: 1.2rem;
`;

const StyledHeading = styled(Heading)`
	color: var(--color-primary-500);
`;

const SubmitButton = styled(Button)`
	margin-top: 1.2rem;
	color: var(--color-primary-0);
`;

type Status = "error" | "idle" | "pending" | "success";

interface IFormManager {
	name: string;
	submitHandler: (data: FormValues) => void;
	statuses?: Status[];
}

type FormValues = {
	email: string;
	password: string;
};

const FormManager = (props: IFormManager) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		mode: "onBlur",
		defaultValues: {
			email: "Email",
			password: "Password",
		},
	});
	const { submitHandler, name, statuses } = props;

	const onSubmit: SubmitHandler<FormValues> = (data) => submitHandler(data);

	const emailValidation = {
		required: "Email is required",
		pattern: {
			value: /^\S+@\S+\.\S+$/,
			message: "Invalid email address",
		},
	};

	const passwordValidation = {
		required: "Password is required",
		pattern: {
			value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};:'"<>,.?~\\-])\S*$/,
			message: "Password must contain at least one uppercase letter and one special character",
		},
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<StyledHeading
				as="h1"
				center
			>
				{name}
			</StyledHeading>
			<FormField<FormValues>
				name="email"
				type="email"
				placeholder="Email"
				register={register}
				validation={emailValidation}
				errors={errors.email}
			/>
			<FormField<FormValues>
				name="password"
				type="password"
				placeholder="Password"
				register={register}
				validation={passwordValidation}
				errors={errors.password}
			/>
			<SubmitButton
				disabled={statuses?.includes("pending")}
				type="submit"
			>
				{name}
			</SubmitButton>
		</StyledForm>
	);
};

export default FormManager;
