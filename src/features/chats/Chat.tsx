import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import useProfile from "../profiles/useProfile";
import getSecondPartOfCombinedString from "../../utils/getSecondPartOfCombinedString";
import ChatWindow from "./ChatWindow";
import ChatForm from "./form/ChatForm";
import { flexColumn, flexRow } from "../../style/Templates";
import { Container } from "../../ui/Container";
import { Wrapper } from "../../ui/Wrapper";
import ChatTitle from "./ChatTitle";
import ChatMore from "./ChatMore";

const StyledWrapper = styled(Wrapper)`
	${flexRow};
	height: 100%;
`;

const StyledChat = styled(Container)`
	${flexColumn};
	max-height: 100vh;
	width: 75%;
	flex-grow: 1;
`;

// TODO: Change for current logged user id
// TODO: Add users' id to chats collection
const Chat = () => {
	const { combinedId } = useParams();
	const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
	const currentUser = "ivKwYDsLxLkM34cMKDdw";
	const friendId = getSecondPartOfCombinedString({ combinedString: combinedId || "", knownPart: currentUser });
	const { profileData } = useProfile({ passedUserId: friendId });

	const handleOpenMore = () => {
		setIsMoreOpen((prev) => !prev);
	};

	return (
		<StyledWrapper>
			<StyledChat>
				<ChatTitle
					handlerOpen={handleOpenMore}
					nickname={profileData?.data.nickname}
				/>
				<ChatWindow currentUser={currentUser} />
				<ChatForm />
			</StyledChat>
			{isMoreOpen && (
				<ChatMore
					handlerClose={handleOpenMore}
					data={profileData?.data}
				/>
			)}
		</StyledWrapper>
	);
};

export default Chat;
