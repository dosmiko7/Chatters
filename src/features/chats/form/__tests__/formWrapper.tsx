import { FormProvider, useForm } from "react-hook-form";

import { IChatFormInput } from "../ChatForm";

const Wrapper = ({ children }: { children: JSX.Element }) => {
	const formMethods = useForm<IChatFormInput>({
		defaultValues: { message: "", file: null, gif: "", emoji: "" },
		mode: "all",
	});

	return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export default Wrapper;
