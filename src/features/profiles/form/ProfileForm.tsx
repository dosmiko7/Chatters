import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

import { Form } from "../../../ui/Form";
import ProfileFormPersonals from "./ProfileFormPersonals";
import ProfileFormSocials from "./ProfileFormSocials";
import ProfileFormDescription from "./ProfileFormDescription";
import ProfileFormImages from "./ProfileFormImages";
import { Button } from "../../../ui/Button";

interface IProfileFormImages {
	avatar: File[];
	background: File[];
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

const ProfileForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IProfileFormInput>({ mode: "all" });

	const avatarWatch = watch("avatar");
	const backgroundWatch = watch("background");

	const onSubmit: SubmitHandler<IProfileFormInput> = (data) => console.log(data);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<ProfileFormImages<IProfileFormInput>
				register={register}
				errors={errors}
				avatarWatcher={avatarWatch}
				backgroundWatcher={backgroundWatch}
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
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default ProfileForm;
