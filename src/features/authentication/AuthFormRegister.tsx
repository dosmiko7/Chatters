import styled from "styled-components";
import { Link } from "react-router-dom";

import useRegister from "./useRegister";
import { ephasis } from "../../style/Templates";
import { ISignProps } from "../../services/auth/authApi";
import { FormWindow } from "../../ui/FormWindow";
import AuthFormManager from "./AuthFormManager";

const StyledLink = styled(Link)`
	${ephasis};
	position: absolute;
	left: 50%;
	bottom: 5%;
	transform: translateX(-50%);
`;

const AuthFormRegister = () => {
	const { register, status } = useRegister();

	const submitHandler = (data: ISignProps) => {
		if (!data) return;
		register(data);
	};

	return (
		<FormWindow>
			<AuthFormManager
				submitHandler={submitHandler}
				name="Register"
				statuses={[status]}
			/>
			<StyledLink to="/login">Login with existed account</StyledLink>
		</FormWindow>
	);
};

export default AuthFormRegister;
