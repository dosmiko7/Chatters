import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { IUserData, updateUser } from "../../../services/firestore";
import { IProfileFormInput } from "./ProfileForm";

const useProfileFormSubmit = () => {
	const { userId } = useParams();
	const queryClient = useQueryClient();
	const profileData: { id: string; data: IUserData } | undefined = queryClient.getQueryData(["profile", userId]);

	const { mutate: submit, status } = useMutation({
		mutationFn: (input: IProfileFormInput) => updateUser({ input, userId, data: profileData?.data }),

		// TODO: On succes edit query for profile
		onSuccess: (data) => {
			queryClient.setQueryData(["profile", userId], { id: userId, data });
		},

		onError: (err) => {
			console.error("SUBMIT ERROR ", err);
		},
	});

	return { submit, status };
};

export default useProfileFormSubmit;
