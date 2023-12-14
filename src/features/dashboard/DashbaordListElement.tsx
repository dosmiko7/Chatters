import { IPostDataProps } from "../../services/firestore";

const DashboardListElement = ({ postData }: { postData: IPostDataProps }) => {
	const { userId, avatar, nickname, message, file, type, created_at } = postData;

	return (
		<div>
			<div>
				<div>{avatar}</div>
				<span>{nickname}</span>
			</div>
			<div>{message}</div>
			<div>{file}</div>
			<div>-----------------------------------------</div>
		</div>
	);
};

export default DashboardListElement;
