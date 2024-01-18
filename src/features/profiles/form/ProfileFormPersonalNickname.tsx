import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { nicknameValidation } from "../../../utils/validationTemplates";
import ErrorMessage from "../../../ui/ErrorMessage";
import InputProfileForm from "../../../ui/InputProfileForm";
import Wrapper from "../../../ui/Wrapper";

const NicknameInputSection = styled(Wrapper)``;

const ProfileFormPersonalNickname = () => {
	const { register, formState } = useFormContext();
	const errors = formState.errors;

	return (
		<NicknameInputSection aria-label="Nickname input section">
			<InputProfileForm
				type="text"
				placeholder="Nickname"
				{...register("nickname", nicknameValidation)}
			/>
			{errors["nickname"] && <ErrorMessage>{get(errors, "nickname")?.message}</ErrorMessage>}
		</NicknameInputSection>
	);
};

export default ProfileFormPersonalNickname;
