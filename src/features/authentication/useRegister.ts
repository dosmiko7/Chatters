import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ISignProps, sendVerificationLink, signUp } from "../../services/auth/authApi";
import { addUser } from "../../services/firestore/userApi";

const useRegister = () => {
	const navigate = useNavigate();

	const { mutate: register, status } = useMutation({
		mutationFn: ({ email, password }: ISignProps) =>
			signUp({ email, password }).then((userCredential) => addUser(userCredential.user)),

		onSuccess: async () => {
			toast.success("Your account has been created! We have sent you an account activation link");
			await sendVerificationLink();
			navigate("/login", { replace: true });
		},

		onError: (err) => {
			console.error("REGISTER ERROR: ", err);
			toast.error("Register failed");
		},
	});

	return { register, status };
};

export default useRegister;
