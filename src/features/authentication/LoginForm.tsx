import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import styled from "styled-components";
import LoginFormField from "./LoginFormField";

const StyledLoginForm = styled(Form)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%);
	width: 40rem;
	height: 60rem;
	gap: 1.2rem;
`;

type FormValues = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
		<StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
			<LoginFormField<FormValues>
				name="email"
				type="email"
				label="Email"
				register={register}
				validation={emailValidation}
				errors={errors.email}
			/>
			<LoginFormField<FormValues>
				name="password"
				type="password"
				label="Password"
				register={register}
				validation={passwordValidation}
				errors={errors.password}
			/>
			<Button type="submit">Submit</Button>
		</StyledLoginForm>
	);
};

export default LoginForm;

/*
<Label>Email:</Label>
			<Input
				type="email"
				{...register("email", emailValidation)}
			/>
			{errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
			*/
