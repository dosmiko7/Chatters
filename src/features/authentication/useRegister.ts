import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ISignProps, signUp } from "../../services/auth";
import { User } from "firebase/auth";
import { addUser } from "../../services/firestore";

const useRegister = () => {
	const navigate = useNavigate();

	const { mutate: register, status } = useMutation({
		mutationFn: ({ email, password }: ISignProps) => signUp({ email, password }).then((user: User) => addUser(user)),

		onSuccess: () => {
			toast.success("Your account has been created!");
			navigate("/login", { replace: true });
		},

		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { register, status };
};

export default useRegister;
