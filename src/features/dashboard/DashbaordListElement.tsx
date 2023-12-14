import styled from "styled-components";
import { IPostDataProps } from "../../services/firestore";
import { Avatar } from "../../ui/Avatar";
import { flexRow } from "../../style/Templates";
import Heading from "../../ui/Heading";
import Paragraph from "../../ui/Paragraph";
import { useNavigate } from "react-router-dom";

const Post = styled.div`
	border: 1px solid red;
	padding: 2rem;
	max-width: 70rem;
`;

const Header = styled.header`
	${flexRow};
`;

const Nickname = styled(Heading).attrs({
	as: "h3",
})`
	padding-left: 1rem;
`;

const Date = styled.span`
	margin-left: auto;
`;

const DashboardListElement = ({ postData }: { postData: IPostDataProps }) => {
	const navigate = useNavigate();
	const { userId, avatar, nickname, message, file, type, createdAt } = postData;

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
				<div>
					{file} + {type}
				</div>
			)}
		</Post>
	);
};

export default DashboardListElement;
