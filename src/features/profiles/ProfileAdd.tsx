import { useParams } from "react-router-dom";
import { Button } from "../../ui/Button";
import useLoggedUser from "../authentication/useLoggedUser";

const ProfileAdd = () => {
	const { data } = useLoggedUser();
	const { userId } = useParams();

	if (data === undefined || data.uid === userId) return null;

	return <Button>ProfileAdd</Button>;
};

export default ProfileAdd;
