// import { useParams } from "react-router-dom";
// import useLoggedUser from "../authentication/useLoggedUser";
import { BiUserPlus } from "react-icons/bi";

import ButtonProfile from "../../ui/ButtonProfile";

// TODO: Logic for adding friends
const ProfileButtonAdd = () => {
	// const { data } = useLoggedUser();
	// const { userId } = useParams();

	//if (data === undefined || data.uid === userId) return null;

	return (
		<ButtonProfile>
			<BiUserPlus style={{ fontSize: "2.4rem" }} />
			<span>Add to friends</span>
		</ButtonProfile>
	);
};

export default ProfileButtonAdd;
