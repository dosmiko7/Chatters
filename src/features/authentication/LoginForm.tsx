import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";

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
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Label>Email:</Label>
			<Input
				type="email"
				{...register("email", emailValidation)}
			/>
			{errors.email && <p>{errors.email?.message}</p>}
			<Label>Password:</Label>
			<Input
				type="password"
				{...register("password", passwordValidation)}
			/>
			{errors.password && <p>{errors.password?.message}</p>}
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default LoginForm;
