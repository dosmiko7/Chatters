import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

import { ISignProps, sendVerificationLink, signUp } from "../../services/auth/authApi";
import { addUser } from "../../services/firestore/userApi";

const useRegister = () => {
	const navigate = useNavigate();

	const { mutate: register, status } = useMutation({
		mutationFn: ({ email, password }: ISignProps) =>
			signUp({ email, password }).then((user: User | null) => addUser(user)),

		onSuccess: () => {
			toast.success("Your account has been created! We have sent you an account activation link");
			sendVerificationLink();
			navigate("/login", { replace: true });
		},

		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { register, status };
};

export default useRegister;
