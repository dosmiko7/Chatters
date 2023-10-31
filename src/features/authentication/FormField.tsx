import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { Input } from "../../ui/Input";
import styled from "styled-components";
import { flexColumn } from "../../style/Templates";

const StyledFormField = styled.div`
	${flexColumn};
`;

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
		<StyledFormField>
			<Input
				placeholder={placeholder}
				type={type}
				{...register(name, validation)}
			/>
			{errors && <ErrorMessage>{errors?.message}</ErrorMessage>}
		</StyledFormField>
	);
};

export default FormField;
