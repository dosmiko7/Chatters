import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import { flexRow } from "../../style/Templates";
import AuthFormField from "./AuthFormField";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledForm = styled(Form)`
	position: relative;
	gap: 1.2rem;
`;

const SubmitButton = styled(Button)`
	${flexRow};
	justify-content: center;
	margin-top: 1.2rem;
`;

type Status = "error" | "idle" | "pending" | "success";

interface IFormManager {
	name: "Login" | "Register";
	submitHandler: (data: FormValues) => void;
	statuses?: Status[];
}

type FormValues = {
	email: string;
	password: string;
};

const emailValidation = {
	required: "Email is required",
	pattern: {
		value: /^\S+@\S+\.\S+$/,
		message: "Invalid email address",
	},
};

const passwordRegisterValidation = {
	required: "Password is required",
	pattern: {
		value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};:'"<>,.?~\\-])\S*$/,
		message: "Password must contain at least one uppercase letter and one special character",
	},
};

const passwordLoginValidation = {
	required: "Password is required",
};

const AuthFormManager = (props: IFormManager) => {
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

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<Heading
				as="h1"
				center
			>
				{name}
			</Heading>
			<AuthFormField<FormValues>
				name="email"
				type="email"
				placeholder="Email"
				register={register}
				validation={emailValidation}
				errors={errors.email}
			/>
			<AuthFormField<FormValues>
				name="password"
				type="password"
				placeholder="Password"
				register={register}
				validation={name === "Login" ? passwordLoginValidation : passwordRegisterValidation}
				errors={errors.password}
			/>
			<SubmitButton
				disabled={statuses?.includes("pending")}
				type="submit"
			>
				<p>{name}</p>
			</SubmitButton>
		</StyledForm>
	);
};

export default AuthFormManager;
