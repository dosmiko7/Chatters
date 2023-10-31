import { BiSolidLogOut } from "react-icons/bi";
import { Button } from "./Button";

// TODO: Add logout logic

const Logout = () => {
	return (
		<Button
			variant="menu"
			size="medium"
		>
			<BiSolidLogOut />
		</Button>
	);
};

export default Logout;
