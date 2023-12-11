import { BiSolidUserAccount } from "react-icons/bi";

import Empty from "../../ui/Empty";

const Profiles = () => {
	return (
		<Empty
			message="No profile selected"
			icon={<BiSolidUserAccount />}
		/>
	);
};

export default Profiles;
