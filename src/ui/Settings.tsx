import { useNavigate } from "react-router-dom";
import { FaGear } from "react-icons/fa6";

import Button from "./Button";

const Settings = () => {
	const navigate = useNavigate();

	return (
		<Button
			variant="menu"
			onClick={() => navigate("/settings")}
		>
			<FaGear />
		</Button>
	);
};

export default Settings;
