import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { FlexColumn } from "../../ui/Flex";
import { Input } from "../../ui/Input";

interface IFormFieldProps<T extends FieldValues> {
	name: Path<T>;
	type: string;
	placeholder: string;
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

const FormField = <T extends FieldValues>(props: IFormFieldProps<T>) => {
	const { name, type, placeholder, register, validation, errors } = props;

	return (
		<FlexColumn>
			<Input
				placeholder={placeholder}
				type={type}
				{...register(name, validation)}
			/>
			{errors && <ErrorMessage>{errors?.message}</ErrorMessage>}
		</FlexColumn>
	);
};

export default FormField;
