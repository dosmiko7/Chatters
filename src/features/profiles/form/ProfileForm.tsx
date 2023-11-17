import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
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
import ThreeDots from "../../../ui/ThreeDots";

const StatusContainer = styled.div`
	position: absolute;
	${flexCentered}
	bottom: 0;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 2.2rem;
`;

interface IProfileFormImages {
	avatar: File[] | null;
	background: File[] | null;
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

// TODO: Get profile's (so current, cuz other way we should not edit profile) userID from Query
const ProfileForm = () => {
	const methods = useForm<IProfileFormInput>({ mode: "all" });
	const { handleSubmit, reset, watch } = methods;

	const { submit, status } = useProfileFormSubmit();

	const avatarWatch = watch("avatar");
	const backgroundWatch = watch("background");

	const onSubmit: SubmitHandler<IProfileFormInput> = (input: IProfileFormInput) => {
		const avatarData = input.avatar?.length ? input.avatar : null;
		const backgroundData = input.background?.length ? input.background : null;

		const correctedInput = { ...input, avatar: avatarData, background: backgroundData };

		submit(correctedInput);
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ProfileFormImages
					avatarWatcher={avatarWatch}
					backgroundWatcher={backgroundWatch}
				/>
				<ProfileFormPersonals />
				<ProfileFormSocials />
				<ProfileFormDescription />
				<ProfileFormButtons reset={reset} />
				<StatusContainer>
					{status === "success" && <FaCheck style={{ color: "var(--color-green-100)" }} />}
					{status === "pending" && <ThreeDots />}
					{status === "error" && <FaCircleXmark style={{ color: "var(--color-red-100)" }} />}
				</StatusContainer>
			</Form>
		</FormProvider>
	);
};

export default ProfileForm;
