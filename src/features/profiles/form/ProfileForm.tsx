import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import styled from "styled-components";
import { FaCheck, FaCircleXmark } from "react-icons/fa6";

import useProfileFormSubmit from "./useProfileFormSubmit";
import { Form } from "../../../ui/Form";
import ProfileFormPersonals from "./ProfileFormPersonals";
import ProfileFormSocials from "./ProfileFormSocials";
import ProfileFormDescription from "./ProfileFormDescription";
import ProfileFormImages from "./ProfileFormImages";
import ProfileFormButtons from "./ProfileFormButtons";
import { flexCentered } from "../../../style/Templates";

const StatusContainer = styled.div`
	position: absolute;
	${flexCentered}
	bottom: 0;
	left: 50%;
	transform: translate(-50%, -50%);
	color: var(--color-white-100);
	border-radius: var(--border-radius-circle);
	font-size: 2.2rem;
`;

interface IProfileFormImages {
	avatar: File[] | null;
	background: File[] | null;
}

interface IProfileFormPersonals {
	nickname: string;
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

export interface IProfileFormInput
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
		reset,
		watch,
		formState: { errors },
	} = useForm<IProfileFormInput>({ mode: "all" });
	const { submit, status } = useProfileFormSubmit();

	const avatarWatch = watch("avatar");
	const backgroundWatch = watch("background");

	const onSubmit: SubmitHandler<IProfileFormInput> = (data: IProfileFormInput) => {
		const avatarData = data.avatar?.length ? data.avatar : null;
		const backgroundData = data.background?.length ? data.background : null;

		const updatedData = { ...data, avatar: avatarData, background: backgroundData };

		submit({ data: updatedData, userID: "updateTest" });
	};

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
			<ProfileFormButtons reset={reset} />
			<StatusContainer>
				{status === "success" && <FaCheck />}
				{status === "error" && <FaCircleXmark />}
			</StatusContainer>
		</Form>
	);
};

export default ProfileForm;
