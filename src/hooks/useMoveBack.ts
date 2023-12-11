import { useNavigate } from "react-router-dom";

const useMoveBack = () => {
	const navigate = useNavigate();
	const moveBack = () => navigate(-1);

	return moveBack;
};

export default useMoveBack;
