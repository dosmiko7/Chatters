import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { FlexColumn } from "../../ui/Flex";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";

interface ILoginFormFieldProps<T extends FieldValues> {
	name: Path<T>;
	type: string;
	label: string;
	register: UseFormRegister<T>;
	validation: {
		required: string;
		pattern: {
			value: RegExp;
			message: string;
		};
	};
	errors: FieldError | undefined;
}

const LoginFormField = <T extends FieldValues>(props: ILoginFormFieldProps<T>) => {
	const { name, type, label, register, validation, errors } = props;

	return (
		<FlexColumn>
			<Label>{label}</Label>
			<Input
				type={type}
				{...register(name, validation)}
			/>
			{errors && <ErrorMessage>{errors?.message}</ErrorMessage>}
		</FlexColumn>
	);
};

export default LoginFormField;
