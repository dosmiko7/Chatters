import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

import { Form } from "../../../ui/Form";
import ProfileFormPersonals from "./ProfileFormPersonals";
import ProfileFormSocials from "./ProfileFormSocials";
import ProfileFormDescription from "./ProfileFormDescription";
import ProfileFormImages from "./ProfileFormImages";

interface IProfileFormImages {
	avatar: string;
	background: string;
}

interface IProfileFormPersonals {
	name: string;
	surname: string;
	city: string;
	birthday: Date;
}

interface IProfileFormSocials {
	linkedin: string;
	github: string;
	twitter: string;
}

interface IProfileFormDescription {
	description: string;
}

interface IProfileFormInput
	extends IProfileFormImages,
		IProfileFormPersonals,
		IProfileFormSocials,
		IProfileFormDescription {}

export interface IProfileFormFieldProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
}

const ProfileFormWindow = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IProfileFormInput>({ mode: "onBlur" });
	const onSubmit: SubmitHandler<IProfileFormInput> = (data) => console.log(data);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<ProfileFormImages<IProfileFormInput>
				register={register}
				errors={errors}
			/>
			<ProfileFormPersonals<IProfileFormInput>
				register={register}
				errors={errors}
			/>
			<ProfileFormSocials<IProfileFormInput>
				register={register}
				errors={errors}
			/>
			<ProfileFormDescription
				register={register}
				errors={errors}
			/>
		</Form>
	);
};

export default ProfileFormWindow;
