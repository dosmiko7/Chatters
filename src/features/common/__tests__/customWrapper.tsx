import { FormProvider, get, useForm } from "react-hook-form";

interface ICustomFormProps {
	file: FileList | null;
	gif: string;
}

const Wrapper = ({ children }: { children: JSX.Element }) => {
	const formMethods = useForm<ICustomFormProps>({
		defaultValues: { file: null, gif: "" },
		mode: "all",
	});

	const { formState } = formMethods;

	return (
		<FormProvider {...formMethods}>
			<>{children}</>
			{formState.errors["file"] && <p>{get(formState.errors, "file").message}</p>}
			{formState.errors["gif"] && <p>{get(formState.errors, "gif").message}</p>}
		</FormProvider>
	);
};

export default Wrapper;
