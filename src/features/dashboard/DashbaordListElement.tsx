import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { IPostDataProps } from "../../services/firestore/dashboardApi";
import { flexRow } from "../../style/Templates";
import Avatar from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import Paragraph from "../../ui/Paragraph";
import DashboardListAttachment from "./DashboardListAttachment";
import DashboardRemove from "./DashboardRemove";

const Post = styled.div`
	position: relative;
	border-radius: var(--border-radius-md);
	background-color: var(--color-primary-300);
	padding: 2rem;
	width: 100%;
	margin-bottom: 2rem;
`;

const Header = styled.header`
	${flexRow};
	margin-bottom: 1rem;
`;

const Nickname = styled(Heading).attrs({
	as: "h3",
})`
	padding-left: 1rem;
	color: var(--font-color);
`;

const Date = styled.span`
	margin-left: auto;
`;

const DashboardListElement = ({ post }: { post: IPostDataProps }) => {
	const navigate = useNavigate();
	const { userId, avatar, nickname, message, file, type, createdAt } = post.data;

	return (
		<Post>
			<Header>
				<Avatar
					size="4rem"
					src={avatar}
					onClick={() => navigate(`/profile/${userId}`)}
					square
				/>
				<Nickname>{nickname}</Nickname>
				<Date>{createdAt}</Date>
			</Header>
			<Paragraph>{message}</Paragraph>
			{file && (
				<DashboardListAttachment
					type={type}
					file={file}
				/>
			)}
			<DashboardRemove
				postCreatorId={userId}
				postId={post.postId}
			/>
		</Post>
	);
};

export default DashboardListElement;
