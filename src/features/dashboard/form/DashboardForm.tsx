import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Form } from "../../../ui/Form";
import DashboardFormMessage from "./DashboardFormMessage";
import DashboardFormButtons from "./DashboardFormButtons";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import useCreatePost from "./useCreatePost";
import Spinner from "../../../ui/Spinner";
import { useEffect } from "react";

const StyledDashboardForm = styled(Form)`
	position: relative;
	height: 100%;
	gap: 1.6rem;
`;

const LoadingBox = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100% - 1.6rem);
	z-index: 100;
	backdrop-filter: blur(3px);
`;

export interface IDashboardFormInput {
	message: string;
	file: FileList | null;
	gif: string;
}

const DashboardForm = () => {
	const methods = useForm<IDashboardFormInput>({ defaultValues: { message: "", file: null, gif: "" } });
	const { close } = useModal();
	const { createPost, status } = useCreatePost();
	const { handleSubmit, reset } = methods;

	const onSubmit: SubmitHandler<IDashboardFormInput> = async (input: IDashboardFormInput) => {
		createPost(input);
	};

	useEffect(() => {
		if (status === "success") {
			reset();
			close();
		}
	}, [status, reset, close]);

	return (
		<FormProvider {...methods}>
			<StyledDashboardForm onSubmit={handleSubmit(onSubmit)}>
				{status === "pending" && (
					<LoadingBox>
						<Spinner />
					</LoadingBox>
				)}
				<DashboardFormMessage />
				<DashboardFormButtons />
			</StyledDashboardForm>
		</FormProvider>
	);
};

export default DashboardForm;
