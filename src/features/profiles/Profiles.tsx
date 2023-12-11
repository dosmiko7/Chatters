import { BiSolidUserAccount } from "react-icons/bi";

import NoSelectedLayout from "../../ui/NoSelectedLayout";

const Profiles = () => {
	return (
		<NoSelectedLayout
			message="No profile selected"
			icon={<BiSolidUserAccount />}
		/>
	);
};

export default Profiles;
