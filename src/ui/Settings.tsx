import { useNavigate } from "react-router-dom";
import { FaGear } from "react-icons/fa6";
import styled from "styled-components";

import { displayInfo } from "../style/Templates";
import Button from "./Button";

const SettingsButton = styled(Button)`
	${displayInfo({ message: "Settings", position: "right" })}
`;

const Settings = () => {
	const navigate = useNavigate();

	return (
		<SettingsButton
			variant="menu"
			size="large"
			onClick={() => navigate("/settings")}
		>
			<FaGear data-testid="icon" />
		</SettingsButton>
	);
};

export default Settings;
