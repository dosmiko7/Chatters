import { IPostDataProps } from "./DashboardList";

const DashboardListElement = ({ postData }: { postData: IPostDataProps }) => {
	const { userId, avatar, nickname, message, file, type, created_at } = postData;

	return (
		<div>
			<div>
				<img>{avatar}</img>
				<span>{nickname}</span>
			</div>
			<div>{message}</div>
			<div>{file}</div>
		</div>
	);
};

export default DashboardListElement;
