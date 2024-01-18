import { FormProvider, useForm } from "react-hook-form";

import { IProfileFormInput } from "../ProfileForm";

const Wrapper = ({ children }: { children: JSX.Element }) => {
	const formMethods = useForm<IProfileFormInput>({ mode: "all" });

	return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export default Wrapper;
