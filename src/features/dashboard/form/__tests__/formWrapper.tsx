import { FormProvider, useForm } from "react-hook-form";

import { IDashboardFormInput } from "../DashboardForm";

const Wrapper = ({ children }: { children: JSX.Element }) => {
	const formMethods = useForm<IDashboardFormInput>({ defaultValues: { message: "", file: null, gif: "" } });

	return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export default Wrapper;
