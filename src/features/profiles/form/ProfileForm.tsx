import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { Form } from "../../../ui/Form";
import ProfileFormPersonals from "./ProfileFormPersonals";

interface IProfilePersonals {
	name: string;
	surname: string;
	city: string;
	birthday: Date;
}

interface IProfileSocials {
	linkedin: string;
	github: string;
	twitter: string;
}

interface IProfileDescription {
	description: string;
}

interface IProfileFormInput extends IProfilePersonals, IProfileSocials, IProfileDescription {}

export interface IProfileFormFieldProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
}

const ProfileForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IProfileFormInput>();
	const onSubmit: SubmitHandler<IProfileFormInput> = (data) => console.log(data);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<ProfileFormPersonals<IProfileFormInput>
				register={register}
				errors={errors}
			/>
		</Form>
	);
};

export default ProfileForm;
