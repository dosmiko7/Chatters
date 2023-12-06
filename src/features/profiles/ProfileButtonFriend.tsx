//import { useParams } from "react-router-dom";
// import useLoggedUser from "../authentication/useLoggedUser";
import { BiUserMinus, BiUserPlus } from "react-icons/bi";

import ButtonProfile from "../../ui/ButtonProfile";

// TODO: Logic for adding friends
// TODO: Change fixed loggedUserId to dynamic one
const ProfileButtonFriend = () => {
	// const { data } = useLoggedUser();
	//const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	//const { userId: profileId } = useParams();

	//if (data === undefined || data.uid === userId) return null;

	return (
		<>
			<ButtonProfile>
				<BiUserMinus style={{ fontSize: "2.4rem" }} />
				<span>Remove friend</span>
			</ButtonProfile>
			<ButtonProfile>
				<BiUserPlus style={{ fontSize: "2.4rem" }} />
				<span>Add to friends</span>
			</ButtonProfile>
		</>
	);
};

export default ProfileButtonFriend;
