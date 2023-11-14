import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../services/firestore";
import { IProfileFormInput } from "./ProfileForm";

interface ISubmit {
	data: IProfileFormInput;
	userID: string;
}

const useProfileFormSubmit = () => {
	const { mutate: submit, status } = useMutation({
		mutationFn: (props: ISubmit) => updateUser(props),

		onError: (err) => {
			console.error("SUBMIT ERROR ", err);
		},
	});

	return { submit, status };
};

export default useProfileFormSubmit;
