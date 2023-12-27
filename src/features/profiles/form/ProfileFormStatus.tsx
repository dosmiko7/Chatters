import styled from "styled-components";
import { FaCheck, FaCircleXmark } from "react-icons/fa6";

import { flexCentered } from "../../../style/Templates";
import ThreeDots from "../../../ui/ThreeDots";

const StatusContainer = styled.div`
	position: absolute;
	${flexCentered}
	bottom: 0;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 2.2rem;
`;

const ProfileFormStatus = ({ status }: { status: "error" | "idle" | "pending" | "success" }) => {
	return (
		<StatusContainer>
			{status === "success" && <FaCheck style={{ color: "var(--color-green-100)" }} />}
			{status === "pending" && <ThreeDots />}
			{status === "error" && <FaCircleXmark style={{ color: "var(--color-red-100)" }} />}
		</StatusContainer>
	);
};

export default ProfileFormStatus;
