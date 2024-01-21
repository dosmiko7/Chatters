import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";

import useProfileFormSubmit from "./useProfileFormSubmit";
import Form from "../../../ui/Form";
import ProfileFormPersonals from "./ProfileFormPersonals";
import ProfileFormSocials from "./ProfileFormSocials";
import ProfileFormDescription from "./ProfileFormDescription";
import ProfileFormImages from "./ProfileFormImages";
import ProfileFormButtons from "./ProfileFormButtons";
import ProfileFormStatus from "./ProfileFormStatus";

interface IProfileFormImages {
	avatar: FileList | null;
	background: FileList | null;
}

interface IProfileFormPersonals {
	nickname: string;
	personals: {
		name: string;
		surname: string;
		city: string;
		birthday: Date;
	};
}

interface IProfileFormSocials {
	socials: {
		linkedin: string;
		github: string;
		twitter: string;
	};
}

interface IProfileFormDescription {
	description: string;
}

export interface IProfileFormInput
	extends IProfileFormImages,
		IProfileFormPersonals,
		IProfileFormSocials,
		IProfileFormDescription {}

const StyledProfileForm = styled(Form)`
	height: 100%;
`;

const ProfileForm = ({ images }: { images: { avatar: string; background: string } }) => {
	const methods = useForm<IProfileFormInput>({ mode: "all" });
	const { submit, status } = useProfileFormSubmit();

	const { handleSubmit } = methods;

	const onSubmit: SubmitHandler<IProfileFormInput> = (input: IProfileFormInput) => {
		const avatarData = input.avatar?.length ? input.avatar : null;
		const backgroundData = input.background?.length ? input.background : null;

		const correctedInput = { ...input, avatar: avatarData, background: backgroundData };

		submit(correctedInput);
	};

	return (
		<FormProvider {...methods}>
			<StyledProfileForm
				onSubmit={handleSubmit(onSubmit)}
				aria-label="Profile form"
			>
				<ProfileFormImages images={images} />
				<ProfileFormPersonals />
				<ProfileFormSocials />
				<ProfileFormDescription />
				<ProfileFormButtons />
				<ProfileFormStatus status={status} />
			</StyledProfileForm>
		</FormProvider>
	);
};

export default ProfileForm;
