import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Form } from "../../../ui/Form";
import DashboardFormMessage from "./DashboardFormMessage";
import DashboardFormButtons from "./DashboardFormButtons";
import styled from "styled-components";

const StyledDashboardForm = styled(Form)`
	height: 100%;
	gap: 1.6rem;
`;

interface IDashboardFormInput {
	message: string;
	file: FileList | null;
	gif: string;
}

const DashboardForm = () => {
	const methods = useForm<IDashboardFormInput>({ defaultValues: { message: "", file: null, gif: "" } });
	const { handleSubmit, reset } = methods;

	const onSubmit: SubmitHandler<IDashboardFormInput> = async (input: IDashboardFormInput) => {
		console.log(input);
		reset();
	};

	return (
		<FormProvider {...methods}>
			<StyledDashboardForm onSubmit={handleSubmit(onSubmit)}>
				<DashboardFormMessage />
				<DashboardFormButtons />
			</StyledDashboardForm>
		</FormProvider>
	);
};

export default DashboardForm;
